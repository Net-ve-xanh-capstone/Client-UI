import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { editSchedule } from '../../api/scheduleStaffApi';
import styles from './page.module.css';

function EditSchedule({ modalShow, onHide, scheduleData }) {
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            id: scheduleData?.id || '',
            description: scheduleData?.description || '',
            endDate: scheduleData?.endDate ? new Date(scheduleData.endDate) : null,
            currentUserId: userInfo?.Id || ''
        }
    });

    useEffect(() => {
        if (!userInfo) navigate('/login');
        if (modalShow && scheduleData) {
            reset({
                id: scheduleData.id,
                description: scheduleData.description,
                endDate: scheduleData.endDate ? new Date(scheduleData.endDate) : null,
                currentUserId: userInfo?.Id
            });
        }
    }, [modalShow, scheduleData, userInfo, navigate, reset]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await editSchedule(data);
            toast.success('Chỉnh sửa lịch chấm thành công');
            handleClose();
        } catch (error) {
            toast.error('Có lỗi xảy ra vui lòng thử lại');
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        reset();
        onHide();
    };

    return (
        <Modal show={modalShow} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.infoSection}>
                    <h5>Thông tin chung</h5>
                    <p><strong>Giám khảo:</strong> {scheduleData?.examinerName}</p>
                    <p><strong>Vòng:</strong> {scheduleData?.round}</p>
                    <p><strong>Năm:</strong> {scheduleData?.year}</p>
                    <p><strong>Tình trạng:</strong> {scheduleData?.status === 'Rating' ? 'Đang chấm' : 'Đã chấm xong'}</p>
                    <p><strong>Số lượng bài chấm:</strong> {scheduleData?.judgeCount}</p>
                </div>

                <div className={styles.awardSection}>
                    <h5>Thông tin giải thưởng</h5>
                    {scheduleData?.awards?.map((award) => (
                        <p key={award.id}><strong>{award.rank}:</strong> {award.quantity}</p>
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className={styles.title}>Description</h5>
                            <input
                                {...register('description', { required: 'Please enter a description' })}
                                className={styles.formControl}
                                type="text"
                            />
                            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h5 className={styles.title}>Ngày Chấm</h5>
                            <Controller
                                control={control}
                                name="endDate"
                                rules={{ required: 'Please select a date' }}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        className={styles.formControl}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                    />
                                )}
                            />
                            {errors.endDate && <p className={styles.error}>{errors.endDate.message}</p>}
                        </div>
                    </div>

                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                        className={styles.submitButton}
                    >
                        Update Schedule
                    </LoadingButton>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditSchedule;