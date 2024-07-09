import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getContaintCategory } from '../../api/categoryApi.js';
import Form from 'react-bootstrap/Form';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import { addnewBlog } from '../../api/blogApi.js';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

function AddNewBlog({ triggerClose, refetchData }) {
  const [imageLoaded, setImageLoaded] = useState(null);
  const [listCategory, setListCategory] = useState([]);
  const [txtCategory, setTxtCategory] = useState('');

  const [imagePost, setImagePost] = useState(null);
  const { progress, url } = useUploadImage(imagePost);
  const [txtTitles, setTxtTitles] = useState('');
  const [txtDes, setTxtDes] = useState('');
  const [idCategory, setIdCategory] = useState('');

  const txtTitle = useRef(null);
  const txtDesRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  // check all field in payload must be fill in
  const validation = (payload) => {
    for (const key in payload) {
      if (payload[key] === '' || payload[key] === null) {
        return false;
      }
    }
    return true;
  };

  //auto resize fix with the content
  const resizeTextArea = (value) => {
    if (!txtTitle.current) {
      return;
    }
    if (value === '') {
      txtTitle.current.style.height = 'auto';
      return;
    }
    txtTitle.current.style.height = `${txtTitle.current.scrollHeight}px`;
  };

  // close the popup
  const closePopup = () => {
    triggerClose(null);
  };

  //auto resize fix with the content
  const resizeTextDes = (value) => {
    if (!txtDesRef.current) {
      return;
    }
    if (value === '') {
      txtDesRef.current.style.height = 'auto';
    }
    txtDesRef.current.style.height = `${txtDesRef.current.scrollHeight}px`;
  };

  // adding file to state and loading to the UI
  const changeFile = (e) => {
    console.log('running adding file image');
    if (!(e.target.files.length > 0 && allowedTypes.includes(e.target.files[0].type))) {
      return;
    }
    setImagePost(e.target.files[0]);
    setImageLoaded(URL.createObjectURL(e.target.files[0]));
  };

  //calling api to getting all of category not use
  const getAllCategory = async () => {
    await getContaintCategory()
      .then((res) => {
        const data = res.data.result.list;
        setListCategory(data);
      })
      .catch((err) => console.log(err));
  };

  // post the blog with calling api
  const postBlog = async (payload) => {
    await addnewBlog(payload)
      .then(() => {
        toast.success('Bài viết đã được tải lên !!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        triggerClose(null);
        refetchData();
      })
      .catch((err) => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      });
  };

  // accept the custom hook to get the url from firebase and go to post
  const postImage = () => {
    if (progress) {
      const payload = {
        url: url,
        title: txtTitles,
        description: txtDes,
        categoryId: idCategory,
        currentUserId: 'c4c9fb26-344a-44cb-ad18-6fc2d2604c4c'
      };
      if (validation(payload)) {
        postBlog(payload);
      } else {
        toast.error('Bạn hãy điền đầy đủ thông tin nhé !!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      }
    } else {
      toast.warning('Bạn vui lòng bổ sung thêm ảnh nhé !!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
  };

  // call api in first time join page
  useEffect(() => {
    getAllCategory();
  }, []);

  // resize the box whilt input text
  useEffect(() => {
    window.addEventListener('resize', resizeTextArea);
    window.addEventListener('resize', resizeTextDes);
    return () => {
      window.removeEventListener('resize', () => resizeTextArea(txtTitles));
      window.removeEventListener('resize', () => resizeTextDes(txtDes));
    };
  }, [txtTitles, txtDes]);

  return (
    <div className={`${styles.box} scrollbar`}>
      <div className={styles.scroll_section}>
        <div className={styles.title_line}>
          <h2 className={`tf-title pb-20 ${styles.title}`}>Tạo bài viết mới</h2>
          <CloseIcon
            onClick={() => triggerClose(null)}
            sx={{
              fontSize: '3rem',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* handle upload image */}
        <div className={styles.upload_image}>
          {imageLoaded !== null ? (
            <>
              <label htmlFor="add_more_file" className={styles.image_box}>
                <img src={imageLoaded} alt="image" className={styles.image} />
              </label>
              <input
                type="file"
                className={styles.input_hidden}
                id="add_more_file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => changeFile(e)}
                onClick={(e) => {
                  e.currentTarget.value = null;
                }}
              />
            </>
          ) : (
            <>
              <label htmlFor="add_more_file" className={styles.onClick_upload}>
                <CloudUploadIcon sx={{ color: '#5142fc', fontSize: '20rem' }} />
              </label>
              <input
                type="file"
                className={styles.input_hidden}
                id="add_more_file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => changeFile(e)}
                onClick={(e) => {
                  e.currentTarget.value = null;
                }}
              />
            </>
          )}
        </div>
        {/* ending handle upload image */}

        {/* category */}
        <div className={styles.category_box}>
          <Form.Group controlId="custom-select" className={styles.box_select}>
            <Form.Control
              value={txtCategory}
              onChange={(e) => {
                const selectedOption = e.target.selectedOptions[0];
                const selectedId = selectedOption ? selectedOption.id : '';
                setIdCategory(selectedId);
                setTxtCategory(e.target.value);
              }}
              as="select"
              className={`rounded-0 shadow ${styles.form_selected}`}
            >
              <option className="d-none" value="">
                Chọn thể loại bài viết
              </option>
              {listCategory?.length &&
                listCategory.map((vl, _) => (
                  <option id={vl.id} key={vl.id}>
                    {vl.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </div>
        {/* ending category */}

        {/* title editor */}
        <div className={styles.title_box}>
          <textarea
            ref={txtTitle}
            className={styles.title_input}
            placeholder="Tiêu đề bài viết"
            value={txtTitles}
            onChange={(e) => {
              setTxtTitles(e.target.value);
              resizeTextArea(e.target.value);
            }}
          ></textarea>
        </div>
        {/*ending title editor */}

        {/* des editor */}
        <div className={styles.des_box}>
          <textarea
            ref={txtDesRef}
            className={styles.des_input}
            placeholder="Nội dung bài viết"
            value={txtDes}
            onChange={(e) => {
              setTxtDes(e.target.value);
              resizeTextDes(e.target.value);
            }}
          ></textarea>
        </div>
        {/*ending des editor */}

        <div className={styles.btn_click}>
          <span className={styles.btn_find} onClick={() => closePopup()}>
            <h5>Cancel</h5>
          </span>
          <span className={styles.btn_find} onClick={() => postImage()}>
            <h5>Post</h5>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AddNewBlog;
