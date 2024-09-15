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
import { createPreliminary, editSchedule } from '../../api/scheduleStaffApi';
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
    const [isAutoSchedule, setIsAutoSchedule] = useState(false);
    const [awardLoading, setAwardLoading] = useState(false);

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            description: '',
            roundId: roundData?.id,
            endDate: null,
            listExaminer: [],
            currentUserId: userInfo?.Id,
            judgedCount: 0,
            awardCount: 0,
            listScheduleSingleExaminer: [
                {
                    description: '',
                    endDate: null,
                    examinerId: '',
                    judgedCount: 0,
                    awards: [{ awardId: '', awardCount: 0 }]
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
            const result = data.result.map(val => ({
                awardId: val.id,
                name: val.rank,
                quantity: val.quantity,
                originalQuantity: val.quantity
            }));
            const sortedAwards = sortAwards(result);
            setAwards(sortedAwards);

            // Set the first prize count
            const firstPrize = sortedAwards.find(award => award.name === 'Giải Nhất');
            if (firstPrize) {
                setFirstPrizeCount(firstPrize.originalQuantity);
            }
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
            const payload = isAutoSchedule
                ? {
                    description: data.description,
                    roundId: roundData?.id,
                    endDate: data.endDate,
                    listExaminer: data.listExaminer,
                    judgedCount: data.judgedCount,
                    currentUserId: userInfo?.Id,
                    awards: [{ awardId: awards[0]?.awardId, awardCount: data.awardCount }],
                }
                : {
                    roundId: roundData?.id,
                    currentUserId: userInfo?.Id,
                    listScheduleSingleExaminer: data.listScheduleSingleExaminer.map(examiner => ({
                        ...examiner,
                        awards: [{ awardId: awards[0]?.awardId, awardCount: examiner.awards[0].awardCount }]
                    }))
                };

            const apiCall = type === 'create' ? createPreliminary : editSchedule;
            await apiCall(payload);
            toast.success(type === 'create' ? 'Schedule added successfully' : 'Schedule updated successfully');
            onHide();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(type === 'create' ? 'Failed to add schedule' : 'Failed to update schedule');
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
            toast.error(`Cannot add more examiners than the number of first prizes (${firstPrizeCount})`);
        }
    };

    const renderAutoScheduleForm = () => (
        <>
            <h4 className={styles.title}>Examiners</h4>
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
                        placeholder="Select examiners"
                    />
                )}
            />

            <h4 className={styles.title}>Judging Date</h4>
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

            <h4 className={styles.title}>Number of Judged Items</h4>
            <input
                {...register('judgedCount', { required: 'Please enter the number of judged items' })}
                className={styles.inputModal}
                type="number"
            />
            {errors.judgedCount && <p className={styles.error}>{errors.judgedCount.message}</p>}

            <h4 className={styles.title}>Number of Awards</h4>
            <input
                {...register('awardCount', { required: 'Please enter the number of awards' })}
                className={styles.inputModal}
                type="number"
            />
            {errors.awardCount && <p className={styles.error}>{errors.awardCount.message}</p>}
        </>
    );

    const renderManualScheduleForm = () => (
        <div className={styles.first_zone}>
            <h4 className={styles.title_zone}>Schedule for each examiner</h4>
            <div className={styles.award_info}>
                <h5>Award Information:</h5>
                {awardLoading ? (
                    <CircularProgress color="secondary" size={20} />
                ) : (
                    <ul>
                        {awards.map(award => (
                            <li key={award.awardId}>
                                {award.name}: {award.originalQuantity}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {examinerFields.map((item, index) => (
                <div key={item.id} className={styles.roundBlock}>
                    <div className={styles.remove_block}>
                        <h5>Examiner {index + 1}</h5>
                        {index > 0 && (
                            <RemoveCircleOutline
                                className={styles.icon_remove}
                                onClick={() => removeExaminer(index)}
                            />
                        )}
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <h5 className={styles.title}>Select Examiner</h5>
                            <select
                                {...register(`listScheduleSingleExaminer.${index}.examinerId`, { required: 'Please select an examiner' })}
                                className={styles.formControl}
                            >
                                <option value="">Select examiner</option>
                                {examiners.map((ex) => (
                                    <option key={ex.id} value={ex.id}>{ex.fullName}</option>
                                ))}
                            </select>
                            {errors.listScheduleSingleExaminer?.[index]?.examinerId && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].examinerId.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <h5 className={styles.title}>Judging Date</h5>
                            <Controller
                                control={control}
                                name={`listScheduleSingleExaminer.${index}.endDate`}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        className={styles.formControl}
                                        dateFormat="dd/MM/yyyy"
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
                        <div className="col-md-6">
                            <h5 className={styles.title}>Number of Judged Items</h5>
                            <input
                                {...register(`listScheduleSingleExaminer.${index}.judgedCount`, { required: 'Please enter the number of judged items' })}
                                className={styles.formControl}
                                type="number"
                            />
                            {errors.listScheduleSingleExaminer?.[index]?.judgedCount && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].judgedCount.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <h5 className={styles.title}>Number of Awards</h5>
                            <input
                                {...register(`listScheduleSingleExaminer.${index}.awards.0.awardCount`, { required: 'Please enter the number of awards' })}
                                className={styles.formControl}
                                type="number"
                            />
                            {errors.listScheduleSingleExaminer?.[index]?.awards?.[0]?.awardCount && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].awards[0].awardCount.message}</p>}
                        </div>
                    </div>

                    <div className={styles.list_round}>
                        {awardLoading ? (
                            <div className={styles.loadingContainer}>
                                <CircularProgress color="secondary" />
                            </div>
                        ) : (
                            awards.map(award => (
                                <div key={award.awardId} className={styles.round}>
                                    <div>
                                        <h4 className={styles.title}>{award.name}</h4>
                                        <input
                                            required
                                            className={styles.grid_input}
                                            type="number"
                                            value={award.quantity}
                                            min="0"
                                            onChange={(e) => {
                                                const newValue = Math.max(0, parseInt(e.target.value) || 0);
                                                setAwards(prevAwards =>
                                                    prevAwards.map(a =>
                                                        a.awardId === award.awardId ? { ...a, quantity: newValue } : a
                                                    )
                                                );
                                            }}
                                        />
                                        <div className={styles.grid_input_label}>
                                            Remaining awards: {award.originalQuantity}
                                        </div>
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
                        label={isAutoSchedule ? 'Automatic' : 'Manual'}
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