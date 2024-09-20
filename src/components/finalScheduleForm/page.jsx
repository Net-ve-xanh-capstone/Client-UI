import React, { useState, useEffect, useCallback } from 'react';
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
import { createAutoFinal, createManualFinal } from '../../api/scheduleStaffApi';
import { getAwardForScheduleByRoundId } from '../../api/awrdApi';
import styles from './page.module.css';

const awardOrder = ['Giải Nhất', 'Giải Nhì', 'Giải Ba', 'Giải Khuyến Khích', 'Khác'];
const sortAwards = (awards) => awards.sort((a, b) => awardOrder.indexOf(a.name) - awardOrder.indexOf(b.name));

function FinalSchedule({ modalShow, onHide, roundData, roundId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [examiners, setExaminers] = useState([]);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [awards, setAwards] = useState([]);
    const [isAutoSchedule, setIsAutoSchedule] = useState(false);
    const [awardLoading, setAwardLoading] = useState(false);
    const [paintingForSchedule, setPaintingForSchedule] = useState(0);
    const [firstPrizeCount, setFirstPrizeCount] = useState(0);
    const [totalAwardedCounts, setTotalAwardedCounts] = useState({});

    const { control, register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm({
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

            const quantityPainting = data.result.paintingForSchedule;
            const list = data.result.listAward;

            const result = list.map(val => ({
                awardId: val.id,
                name: val.rank,
                quantity: val.quantity,
                originalQuantity: val.quantity
            }));
            const sortedAwards = sortAwards(result);
            setAwards(sortedAwards);
            setPaintingForSchedule(quantityPainting);

            const firstPrize = sortedAwards.find(award => award.name === 'Giải Nhất');
            if (firstPrize) {
                setFirstPrizeCount(firstPrize.originalQuantity);
            }

            setValue('listScheduleSingleExaminer', examinerFields.map(field => ({
                ...field,
                awards: result.map(award => ({ awardId: award.awardId, awardCount: 0 }))
            })));

            setTotalAwardedCounts(result.reduce((acc, award) => ({
                ...acc,
                [award.awardId]: 0
            }), {}));
        } catch (error) {
            console.error('Error fetching awards:', error);
            toast.error('Failed to fetch awards');
        } finally {
            setAwardLoading(false);
        }
    }, [setValue, examinerFields]);

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name && name.includes('awards') && type === 'change') {
                const newTotalAwardedCounts = { ...totalAwardedCounts };

                // Tính toán lại tổng số giải đã được nhập
                awards.forEach(award => {
                    newTotalAwardedCounts[award.awardId] = value.listScheduleSingleExaminer.reduce(
                        (sum, examiner) =>
                            sum + (examiner.awards.find(a => a.awardId === award.awardId)?.awardCount || 0),
                        0
                    );
                });

                console.log('newTotalAwardedCounts:', newTotalAwardedCounts);  // Kiểm tra giá trị của state
                setTotalAwardedCounts(newTotalAwardedCounts);  // Cập nhật lại state tổng
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, awards, totalAwardedCounts]);


    const calculateRemainingAwards = useCallback((awardId) => {
        const award = awards.find(a => a.awardId === awardId);
        if (!award) return 0;

        // Sử dụng giá trị đã được cập nhật từ totalAwardedCounts
        const remaining = Math.max(award.originalQuantity - (totalAwardedCounts[awardId] || 0), 0);

        console.log('Award ID:', awardId, 'Remaining:', remaining);  // Kiểm tra giá trị tính toán
        return remaining;
    }, [awards, totalAwardedCounts]);

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            console.log('watch triggered:', { value, name, type });  // Log toàn bộ giá trị
        });

        return () => subscription.unsubscribe();
    }, [watch]);



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
                await createAutoFinal(payload);
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
                await createManualFinal(payload);
            }
            toast.success('Thêm lịch chấm thi thành công');
            onHide();
        } catch (error) {
            toast.error('Thêm lịch chấm thi không thành công');
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

    const handleAddExaminer = () => {
        if (examinerFields.length < firstPrizeCount) {
            appendExaminer({
                description: '',
                endDate: null,
                examinerId: '',
                judgedCount: 0,
                awards: awards.map(award => ({
                    awardId: award.awardId,
                    awardCount: 0
                }))
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
                                            {award.name} : {calculateRemainingAwards(award.awardId)}
                                        </h4>
                                        <input
                                            {...register(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardId`)}
                                            type="hidden"
                                            value={award.awardId}
                                        />
                                        <input
                                            {...register(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardCount`, {
                                                required: 'Vui lòng nhập số lượng',
                                                valueAsNumber: true,
                                                validate: (value) => {
                                                    const remaining = calculateRemainingAwards(award.awardId);
                                                    const currentValue = getValues(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardCount`) || 0;
                                                    return value <= (remaining + currentValue) || `Số lượng không được vượt quá ${remaining + currentValue}`;
                                                }
                                            })}
                                            className={styles.formControl}
                                            type="number"
                                            defaultValue={0}
                                            min="0"
                                            max={calculateRemainingAwards(award.awardId) + (getValues(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardCount`) || 0)}
                                            onChange={(e) => {
                                                const newValue = Math.max(0, parseInt(e.target.value) || 0);
                                                setValue(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardCount`, newValue);
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
                <Modal.Title>Add Schedule</Modal.Title>
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
                        Add Schedule
                    </LoadingButton>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default FinalSchedule;