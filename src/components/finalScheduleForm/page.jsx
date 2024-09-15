import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Multiselect from 'multiselect-react-dropdown';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FormControlLabel, Switch, CircularProgress } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import { getAll } from '../../api/examinerStaffApi';
import { createAutoFinal, createManualFinal, editSchedule } from '../../api/scheduleStaffApi';
import { getAwardForScheduleByRoundId } from '../../api/awrdApi';
import styles from './page.module.css';

const awardOrder = ['Giải Nhất', 'Giải Nhì', 'Giải Ba', 'Giải Khuyến Khích', 'Khác'];
const sortAwards = (awards) => awards.sort((a, b) => awardOrder.indexOf(a.name) - awardOrder.indexOf(b.name));

function FinalSchedule({
    modalShow,
    onHide,
    roundData,
    type,
    roundId,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [examiners, setExaminers] = useState([]);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [awards, setAwards] = useState([]);
    const [award, setAward] = useState([]);
    const [isAutoSchedule, setIsAutoSchedule] = useState(false);
    const [awardLoading, setAwardLoading] = useState(false);
    const [paintingForSchedule, setPaintingForSchedule] = useState(false);

    const { control, register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
        defaultValues: {
            description: '',
            roundId: roundData?.id,
            endDate: null,
            listExaminer: [],
            currentUserId: userInfo?.Id,
            listScheduleSingleExaminer: [
                {
                    description: '',
                    endDate: null,
                    examinerId: '',
                    judgedCount: 0,
                    awards: []
                }
            ]
        }
    });

    const [firstPrizeCount, setFirstPrizeCount] = useState(0);

    const {
        fields: examinerFields,
        append: appendExaminer,
        remove: removeExaminer,
    } = useFieldArray({
        control,
        name: 'listScheduleSingleExaminer',
    });

    const fetchAwards = useCallback(async (id) => {
        setAwardLoading(true);
        try {
            const { data } = await getAwardForScheduleByRoundId(id);

            const quantityPainting = data.result.paintingForSchedule; // Số lượng paintings trong schedule
            const list = data.result.listAward;

            const result = list.map(val => ({
                awardId: val.id,
                name: val.rank,
                quantity: 0,
                originalQuantity: val.quantity
            }));
            const sortedAwards = sortAwards(result);
            setAwards(sortedAwards);
            setPaintingForSchedule(quantityPainting);

            // Set the first prize count
            const firstPrize = sortedAwards.find(award => award.name === 'Giải Nhất');
            if (firstPrize) {
                setFirstPrizeCount(firstPrize.originalQuantity);
            }

            // Initialize awards for each examiner
            setValue('listScheduleSingleExaminer', examinerFields.map(field => ({
                ...field,
                awards: result.map(award => ({ awardId: award.awardId, awardCount: 0 }))
            })));
        } catch (error) {
            console.error('Error fetching awards:', error);
            toast.error('Failed to fetch awards');
        } finally {
            setAwardLoading(false);
        }
    }, []);

    const fetchExaminers = async () => {
        try {
            const { data } = await getAll();
            setExaminers(data.result);
        } catch (error) {
            console.error('Error fetching examiners:', error);
            toast.error('Failed to fetch examiners');
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let payload;
            if (isAutoSchedule) {
                payload = {
                    description: data.description,
                    roundId: roundData?.id,
                    endDate: data.endDate,
                    listExaminer: data.listExaminer,
                    currentUserId: userInfo?.Id
                };
            } else {
                payload = {
                    roundId: roundData?.id,
                    currentUserId: userInfo?.Id,
                    listScheduleSingleExaminer: data.listScheduleSingleExaminer.map(examiner => ({
                        description: examiner.description,
                        endDate: examiner.endDate,
                        examinerId: examiner.examinerId,
                        judgedCount: parseInt(examiner.judgedCount),
                        awards: examiner.awards.filter(award => award.awardCount > 0).map(award => ({
                            awardId: award.awardId,
                            awardCount: parseInt(award.awardCount)
                        }))
                    }))
                };
            }

            if (type === 'create') {
                if (isAutoSchedule) {
                    await createAutoFinal(payload);
                } else {
                    await createManualFinal(payload);
                }
                toast.success('Thêm lịch chấm thi thành công');
            } else {
                await editSchedule(payload);
                toast.success('Chỉnh sửa lịch chấm thành công');
            }
            onHide();
        } catch (error) {
            toast.error(type === 'create' ? 'Thêm lịch chấm thi không thành công' : 'Có lỗi xảy ra vui lòng thử lại');
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!userInfo) navigate('/login');
        if (modalShow) {
            reset();
            if (roundId) fetchAwards(roundId);
        }
        fetchExaminers();
    }, [modalShow, roundId, userInfo, navigate, reset]);

    useEffect(() => {
        if (modalShow && type !== 'create') {
            reset({
                description: type?.description,
                endDate: type?.endDate ? new Date(type.endDate) : null,
                judgedCount: type?.judgedCount,
                awardCount: type?.awards?.[0]?.quantity,
            });
        }
    }, [modalShow, type, reset]);


    const handleAddExaminer = () => {
        if (examinerFields.length < firstPrizeCount) {
            appendExaminer({
                description: '',
                endDate: null,
                examinerId: '',
                judgedCount: 0,
                awards: [{ awardId: '', awardCount: 0 }]
            });
        } else {
            toast.error(`Số lượng giám khảo không nhiều hơn số lượng giải nhất (${firstPrizeCount} giải)`);
        }
    };

    const renderAutoScheduleForm = () => (
        <>
            <h4 className={styles.title}>Giám Khảo</h4>
            <Controller
                control={control}
                name="listExaminer"
                render={({ field }) => (
                    <Multiselect
                        {...field}
                        displayValue="fullName"
                        onRemove={(selectedList) => field.onChange(selectedList.map(item => item.id))}
                        onSelect={(selectedList) => field.onChange(selectedList.map(item => item.id))}
                        options={examiners}
                        selectedValues={type !== 'create' ? [{ id: type?.id, fullName: type?.examinerName }] : []}
                    />
                )}
            />

            <h4 className={styles.title}>Ngày Chấm</h4>
            <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                    <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        className={styles.formControl}
                        dateFormat="dd/MM/yyyy"
                    />
                )}
            />

            <h4 className={styles.title}>Description</h4>
            <input
                {...register('description', { required: 'Please enter a description' })}
                className={styles.inputModal}
                type="text"
            />
            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        </>
    );

    const renderManualScheduleForm = () => (
        <div className={styles.first_zone}>
            <h4 className={styles.title_zone}>Tạo Lịch Chấm</h4>

            {examinerFields.map((item, index) => (
                <div key={item.id} className={styles.roundBlock}>
                    <div className={styles.remove_block}>
                        <h5>Giám Khảo {index + 1}</h5>
                        {index > 0 && (
                            <RemoveCircleOutline
                                className={styles.icon_remove}
                                onClick={() => removeExaminer(index)}
                            />
                        )}
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <h5 className={styles.title}>Giám Khảo</h5>
                            <select
                                {...register(`listScheduleSingleExaminer.${index}.examinerId`, { required: 'Please select an examiner' })}
                                className={styles.formControl}
                            >
                                {examiners.map((ex) => (
                                    <option key={ex.id} value={ex.id}>{ex.fullName}</option>
                                ))}
                            </select>
                            {errors.listScheduleSingleExaminer?.[index]?.examinerId && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].examinerId.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <h5 className={styles.title}>Ngày Chấm</h5>
                            <Controller
                                control={control}
                                name={`listScheduleSingleExaminer.${index}.endDate`}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        className={styles.formControl}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}  // Ngăn chọn ngày trong quá khứ
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h5 className={styles.title}>Description</h5>
                            <input
                                {...register(`listScheduleSingleExaminer.${index}.description`, { required: 'Please enter a description' })}
                                className={styles.formControl}
                                type="text"
                            />
                            {errors.listScheduleSingleExaminer?.[index]?.description && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].description.message}</p>}
                        </div>
                    </div>

                    <div className="row">

                        <h5 className={styles.title}>Sô lượng bài thi : {paintingForSchedule}</h5>
                        <input
                            {...register(`listScheduleSingleExaminer.${index}.judgedCount`, { required: 'Please enter the number of judged items' })}
                            className={styles.formControl}
                            type="number"
                        />
                        {errors.listScheduleSingleExaminer?.[index]?.judgedCount && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].judgedCount.message}</p>}
                    </div>

                    <div className={styles.list_round}>
                        {awardLoading ? (
                            <div className={styles.loadingContainer}>
                                <CircularProgress color="secondary" />
                            </div>
                        ) : (
                            awards.map((award, awardIndex) => (
                                <div key={award.awardId} className={styles.round}>
                                    <div>
                                        <h4 className={styles.title}>
                                            {award.name} : {Math.max(award.originalQuantity - award.quantity, 0)}
                                        </h4>
                                        <input
                                            {...register(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardId`)}
                                            type="hidden"
                                            value={award.awardId}
                                        />
                                        <input
                                            {...register(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardCount`, {
                                                required: 'Vui lòng nhập số lượng',
                                                valueAsNumber: true, // Chuyển đổi giá trị input thành số
                                                validate: (value) => value <= award.originalQuantity || `Số lượng không được vượt quá ${award.originalQuantity}`
                                            })}
                                            className={styles.formControl}
                                            type="number"
                                            value={award.quantity}
                                            min="0"
                                            max={award.originalQuantity} // Giới hạn giá trị lớn nhất
                                            onChange={(e) => {
                                                const newValue = Math.min(
                                                    award.originalQuantity, // Giới hạn giá trị tối đa không vượt quá originalQuantity
                                                    Math.max(0, parseInt(e.target.value) || 0)
                                                );
                                                setAwards(prevAwards =>
                                                    prevAwards.map(a =>
                                                        a.awardId === award.awardId ? { ...a, quantity: newValue } : a
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                            ))
                        )}
                    </div>
                </div>
            ))}
            <div className={styles.add_block}>
                <AddCircleOutline
                    fontSize="large"
                    className={styles.icon_add}
                    onClick={handleAddExaminer}
                />
            </div>
        </div>
    );

    return (
        <Modal show={modalShow} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {type === 'create' ? 'Add Schedule' : 'Edit Schedule'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isAutoSchedule}
                                onChange={() => setIsAutoSchedule(!isAutoSchedule)}
                                name="scheduleType"
                                color="primary"
                            />
                        }
                        label={isAutoSchedule ? 'Tự Động' : 'Thủ Công'}
                    />

                    {isAutoSchedule ? renderAutoScheduleForm() : renderManualScheduleForm()}

                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                        className={styles.submitButton}
                    >
                        {type === 'create' ? 'Add Schedule' : 'Update Schedule'}
                    </LoadingButton>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default FinalSchedule;