import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { ratingPainting } from '../../api/rating.js';
import styles from './page.module.css';
import { LoadingButton } from '@mui/lab';

const ModalPaintingContest = ({
  modalShow,
  onHide,
  items,
  awardData,
  awardLoading,
  scheduleId,
  type,
}) => {
  const commentRef = useRef(null);
  const descriptionRef = useRef(null);

  const [commentTxt, setCommentTxt] = useState('');
  const [awardId, setAwardId] = useState({
    value: '',
    label: '',
  });
  const [awardOption, setAwardOptions] = useState([
    { value: '', label: 'Không đạt giải' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // post the marking after click
  const fetchRatingPainting = async payload => {
    setIsLoading(true);
    try {
      await ratingPainting(payload);
      onHide();
      setCommentTxt('');
      toast.success('Chấm điểm thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.log(error);
      toast.error('Chấm điểm không thành công!!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      for (let index in awardId) {
        awardId[index] = '';
      }
      setIsLoading(false);
    }
  };

  // styling the topic label
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'transparent',
      border: '1px solid #8a8aa0',
      // match with the menu
      borderRadius: state.isFocused ? '0.625rem' : '0.625rem',
      color: '#070F2B',
      // Overwrittes the different states of border
      borderColor: 'none !important',
      // Removes weird border around container

      height: '5rem',
      width: '100%',
      fontSize: '1.5rem !important',
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: 'none',
      },
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  //auto resize fix with the content
  const resizeTextArea = value => {
    if (!commentRef.current) {
      return;
    }
    if (value === '') {
      commentRef.current.style.height = 'auto';
      return;
    }
    commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
  };

  //auto resize fix with the content
  const resizeDesRef = value => {
    if (!descriptionRef.current) {
      return;
    }
    if (value === '') {
      descriptionRef.current.style.height = 'auto';
      return;
    }
    descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
  };

  // check the selected field
  const isValidField = () => {
    for (let index in awardId) {
      if (awardId[index] === undefined) {
        return false;
      }
    }
    return true;
  };

  // adding current data to state if component is editting
  const editingField = val => {
    setCommentTxt(val?.reason);
    setAwardId({
      value: val?.awardId || '',
      label: val?.award || 'Không đạt giải' ,
    });
  };

  // handle confirm painting
  const validateConfirm = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!isValidField() || commentTxt === '') {
      toast.warning(
        'Bạn vui lòng để lại đánh giá và chọn giải cho bài thi này nhé !!',
        {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      );
      return;
    }
    if (awardId?.label === 'Không đạt giải') {
      console.log('cap nhat 1');
      const payload = {
        scheduleId: scheduleId,
        paintings: [
          {
            paintingId: items?.id,
            awardId: '',
            reason: commentTxt,
          },
        ],
      };
      fetchRatingPainting(payload);
    } else {
      console.log('cap nhat 2');

      const payload = {
        scheduleId: scheduleId,
        paintings: [
          {
            paintingId: items?.id,
            awardId: awardId?.value,
            reason: commentTxt,
          },
        ],
      };
      fetchRatingPainting(payload);
    }
  };

  // resize the box whilt input text
  useEffect(() => {
    window.addEventListener('resize', resizeTextArea);
    window.addEventListener('resize', resizeDesRef);
    return () => {
      window.removeEventListener('resize', resizeTextArea(commentTxt));
      window.removeEventListener('resize', resizeDesRef(items?.description));
    };
  }, [commentTxt, items?.description]);

  // set the new state to innitial state
  useEffect(() => {
    if (awardData !== null) {
      setAwardOptions(prv => [
        ...awardData.map(val => ({ value: val?.value, label: val?.label })),
        ...prv,
      ]);
    }
  }, [awardData]);

  // checking if component is editting
  useEffect(() => {
    if (type === 'edit') {
      editingField(items);
    } else return;
  }, [items, type]);

  return (
    <>
      <Modal
        show={modalShow}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{ margin: '0 auto' }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Đánh giá bài thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: '80vh',
            overflow: 'scroll',
            scrollbarWidth: 'none',
          }}>
          <form onSubmit={validateConfirm} className={styles.modalForm}>
            <div className={styles.image_box}>
              <img className={styles.image} src={items?.image} alt="" />
            </div>

            <div className={styles.content}>
              <div className={styles.place_input}>
                <h4 className={styles.title}>Tên cuộc thi: </h4>
                <input
                  className={styles.inputModal}
                  type="text"
                  readOnly
                  value={items?.topicName}
                />
              </div>
              <div className={styles.place_input}>
                <h4 className={styles.title}>Tên bài thi: </h4>
                <input
                  className={styles.inputModal}
                  type="text"
                  readOnly
                  value={items?.name}
                />
              </div>
              <div className={styles.place_input}>
                <h4 className={styles.title}>Mã bài thi: </h4>
                <input
                  className={styles.inputModal}
                  type="text"
                  readOnly
                  value={items?.code}
                />
              </div>
              <div className={styles.box_field}>
                <h4 className={styles.title}>Mô tả: </h4>
                <div className={`${styles.title_box} `}>
                  <textarea
                    ref={descriptionRef}
                    className={`${styles.title_input}`}
                    readOnly
                    value={items?.description}></textarea>
                </div>
              </div>
              <div className={styles.place_input}>
                <h4 className={styles.title}>Chọn giải: </h4>
                <div className={styles.select_topic}>
                  <Select
                    isClearable={true}
                    placeholder={<div>Chọn giải</div>}
                    styles={customStyles}
                    options={awardOption}
                    isLoading={awardLoading}
                    defaultValue={{ value: '', label: 'Chọn giải' }}
                    value={awardId}
                    onChange={val => {
                      setAwardId(prev => ({
                        ...prev,
                        value: val?.value || '',
                        label: val?.label,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className={styles.box_field}>
                <h4 className={styles.title}>Đánh giá: </h4>
                <div className={styles.title_box}>
                  <textarea
                    ref={commentRef}
                    className={styles.title_input}
                    placeholder="...."
                    value={commentTxt}
                    onChange={e => {
                      console.log('dang thay doi ne!!');
                      resizeTextArea(e.target.value);
                      setCommentTxt(e.target.value);
                    }}></textarea>
                </div>
              </div>
            </div>

            <div className={styles.btn_place}>
              <LoadingButton
                type="submit"
                className={styles.btnCreate}
                size="large"
                loading={isLoading}
                loadingPosition="center"
                variant="contained">
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  {type === 'edit' ? <h5>Cập nhật</h5> : <h5>Gửi</h5>}
                </span>
              </LoadingButton>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPaintingContest;
