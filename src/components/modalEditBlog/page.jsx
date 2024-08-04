import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { getBlogId, updateBlog } from '../../api/blogApi.js';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import ModalAddingImg from '../ModalAddingImage/page.jsx';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';

function PopupBlog({ setOpenEdit, blogId, recallBlogData }) {
  const { userInfo } = useSelector(state => state.auth);

  const [txtTitles, setTxtTitles] = useState('');
  const [txtDes, setTxtDes] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [supDesValue, setSupDes] = useState('');
  const [url, setUrl] = useState('');

  const [openEditImage, setOpenEditImage] = useState(false);

  const txtTitle = useRef(null);
  const txtDesRef = useRef(null);
  const txtSupDes = useRef(null);

  const inputArea = [
    {
      ref: txtTitle,
      placeHoder: 'Tiêu đề bài viết',
      value: txtTitles,
      onchange: e => {
        setTxtTitles(e.target.value);
        resizeTextArea(e.target.value);
      },
    },
    {
      ref: txtSupDes,
      placeHoder: 'Mô tả bài viết',
      value: supDesValue,
      onchange: e => {
        setSupDes(e.target.value);
        resizeSupDes(e.target.value);
      },
    },
    {
      ref: txtDesRef,
      placeHoder: 'Nội dung bài viết',
      value: txtDes,
      onchange: e => {
        setTxtDes(e.target.value);
        resizeTextDes(e.target.value);
      },
    },
  ];

  // close popup
  const handleClosePopup = () => {
    setOpenEditImage(false);
  };

  // check all field in payload must be fill in
  const validation = payload => {
    for (const key in payload) {
      if (payload[key] === '' || payload[key] === null) {
        return false;
      }
    }
    return true;
  };

  // resize with text whilt typing
  const resizeTextArea = value => {
    if (txtTitle.current) {
      if (value === '') {
        txtTitle.current.style.height = 'auto';
      }
      txtTitle.current.style.height = `${txtTitle.current.scrollHeight}px`;
    }
  };

  const resizeSupDes = value => {
    if (!txtSupDes.current) {
      return;
    }
    if (value === '') {
      txtSupDes.current.style.height = 'auto';
    }
    txtSupDes.current.style.height = `${txtSupDes.current.scrollHeight}px`;
  };

  // resize with text whilt typing
  const resizeTextDes = value => {
    if (!txtDesRef.current) {
      return;
    }
    if (value === ' ') {
      txtDesRef.current.style.height = 'auto';
    }
    txtDesRef.current.style.height = `${txtDesRef.current.scrollHeight}px`;
  };

  // Get blog by id
  const fetchData = async id => {
    await getBlogId(id)
      .then(res => {
        const data = res.data.result;
        setTxtTitles(data.title);
        setTxtDes(data.description);
        setImageUrl(data.images);
        setUrl(data.url);
      })
      .catch(err => console.log(err));
  };

  //update the blog with new payload
  const triggerUpdate = async payload => {
    try {
      await updateBlog(payload);
      recallBlogData();
      toast.success('Bài viết đã được cập nhật thành công !!!', {
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
      toast.success(error, {
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
      setOpenEdit(null);
    }
  };

  // get the url from custom hook with firebase
  const updateImage = () => {
    let payload;
    if (imageUrl.length !== null && imageUrl.length > 0) {
      payload = {
        id: blogId,
        url: url,
        title: txtTitles,
        description: txtDes,
        currentUserId: userInfo.Id,
        newImages: [...imageUrl],
      };
      if (validation(payload)) {
        triggerUpdate(payload);
      } else {
        toast.error('Không được để trống bất cứ trường dữ liệu nào !!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      payload = {
        id: blogId,
        url: imageUrl,
        title: txtTitles,
        description: txtDes,
        currentUserId: 'c4c9fb26-344a-44cb-ad18-6fc2d2604c4c',
      };
      if (validation(payload)) {
        triggerUpdate(payload);
      } else {
        toast.error('Không được để trống bất cứ trường dữ liệu nào !!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };

  // rerender and calling the event for resize the box input
  useEffect(() => {
    window.addEventListener('resize', resizeTextArea(txtTitles));
    window.addEventListener('resize', resizeTextDes(txtDes));
    return () => {
      window.removeEventListener('resize', () => resizeTextArea(txtTitles));
      window.removeEventListener('resize', () => resizeTextDes(txtDes));
    };
  }, [txtTitles, txtDes]);

  // calling blog by id in first time
  useEffect(() => {
    fetchData(blogId);
  }, []);

  return (
    <>
      <ModalAddingImg
        modalShow={openEditImage}
        onHide={handleClosePopup}
        setListImage={setImageUrl}
        listImage={imageUrl}
      />
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.scroll_place}>
            <div className={styles.title_line}>
              <h2 className={`tf-title pb-20 ${styles.title_page}`}>
                Chỉnh sữa bài viết
              </h2>
              <CloseIcon
                onClick={() => setOpenEdit(null)}
                sx={{
                  fontSize: '3rem',
                  cursor: 'pointer',
                }}
              />
            </div>
            <div className={styles.image_line}>
              {imageUrl.length !== null && imageUrl.length > 0 ? (
                <div
                  className={`${styles.grid_container} ${
                    imageUrl.length <= 2 && styles.grid_second_layout
                  } ${imageUrl.length >= 3 && styles.grid_third_layout} ${
                    imageUrl.length === 1 && styles.grid_single_layout
                  }`}>
                  {imageUrl.slice(0, 3).map((val, idx) => (
                    <div
                      key={val}
                      className={`${styles.grid_item} ${
                        imageUrl.length >= 3 && idx === 0 && styles.scale_grid
                      }`}
                      onClick={() => setOpenEditImage(true)}>
                      <img
                        src={val.url}
                        alt="null"
                        className={styles.grid_image}
                      />
                      {idx === 2 && imageUrl.length > 3 && (
                        <div className={styles.quanliti_image}>
                          {`+${imageUrl.length - 3}`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <label
                    htmlFor="add_more_file"
                    onClick={() => setOpenEditImage(true)}
                    className={styles.onClick_upload}>
                    <CloudUploadIcon
                      sx={{ color: '#5142fc', fontSize: '20rem' }}
                    />
                  </label>
                </>
              )}
            </div>
            {inputArea.map((val, _) => (
              <div key={val} className={styles.input_title}>
                <textarea
                  ref={val.ref}
                  className={styles.title_textarea}
                  placeholder={val.placeHoder}
                  value={val.value}
                  onChange={val.onchange}></textarea>
              </div>
            ))}

            <div className={styles.button_trigger}>
              <span
                className={styles.btn_find}
                onClick={() => setOpenEdit(null)}>
                <h5>Cancel</h5>
              </span>
              <span className={styles.btn_find} onClick={() => updateImage()}>
                <h5>Save</h5>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupBlog;
