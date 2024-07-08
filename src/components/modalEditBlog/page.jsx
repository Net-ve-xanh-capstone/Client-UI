import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { getBlogId, updateBlog } from '../../api/blogApi.js';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';

function PopupBlog({ setOpenEdit, blogId, recallBlogData }) {
  const [txtTitles, setTxtTitles] = useState('');
  const [txtDes, setTxtDes] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePost, setImagePost] = useState('');
  const { progress, url, error } = useUploadImage(imagePost);

  const txtTitle = useRef(null);
  const txtDesRef = useRef(null);
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const resizeTextArea = (value) => {
    if (!txtTitle.current) {
      return;
    }
    if (value === ' ') {
      txtTitle.current.style.height = 'auto';
    }
    txtTitle.current.style.height = `${txtTitle.current.scrollHeight}px`;
  };

  const resizeTextDes = (value) => {
    if (!txtDesRef.current) {
      return;
    }
    if (value === ' ') {
      txtDesRef.current.style.height = 'auto';
    }
    txtDesRef.current.style.height = `${txtDesRef.current.scrollHeight}px`;
  };

  const changeFile = (e) => {
    if (!(e.target.files.length > 0 && allowedTypes.includes(e.target.files[0].type))) {
      return;
    }
    setImagePost(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  // Get blog by id
  const fetchData = async (id) => {
    await getBlogId(id)
      .then((res) => {
        const data = res.data.result;
        setTxtTitles(data.title);
        setTxtDes(data.description);
        setImageUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const triggerUpdate = async (payload) => {
    try {
      await updateBlog(payload);
      recallBlogData();
    } catch (error) {
      console.log(error);
    } finally {
      setOpenEdit(null);
    }
  };

  const updateImage = () => {
    let payload;
    if (progress) {
      payload = {
        id: blogId,
        url: url,
        title: txtTitles,
        description: txtDes,
        currentUserId: 'c4c9fb26-344a-44cb-ad18-6fc2d2604c4c'
      };
      triggerUpdate(payload);
    }
    if (error) {
      alert(error);
    } else {
      payload = {
        id: blogId,
        url: imageUrl,
        title: txtTitles,
        description: txtDes,
        currentUserId: 'c4c9fb26-344a-44cb-ad18-6fc2d2604c4c'
      };
      triggerUpdate(payload);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeTextArea);
    window.addEventListener('resize', resizeTextDes);
    return () => {
      window.removeEventListener('resize', () => resizeTextArea(txtTitles));
      window.removeEventListener('resize', () => resizeTextDes(txtDes));
    };
  }, [txtTitles, txtDes]);

  useEffect(() => {
    console.log('calling data');
    fetchData(blogId);
  }, []);

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.scroll_place}>
          <div className={styles.title_line}>
            <h2 className={`tf-title pb-20 ${styles.title_page}`}>Chỉnh sữa bài viết</h2>
            <CloseIcon
              onClick={() => setOpenEdit(null)}
              sx={{
                fontSize: '3rem',
                cursor: 'pointer'
              }}
            />
          </div>
          <div className={styles.image_line}>
            {imageUrl !== null && (
              <>
                <label htmlFor="add_more_file" className={styles.image_box}>
                  <img src={imageUrl} alt="image" className={styles.image} />
                </label>
                <input
                  type="file"
                  className={styles.input_hidden}
                  id="add_more_file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => changeFile(e)}
                />
              </>
            )}
          </div>
          <div className={styles.input_title}>
            <textarea
              ref={txtTitle}
              className={styles.title_textarea}
              placeholder="Tiêu đề bài viết"
              value={txtTitles}
              onChange={(e) => {
                setTxtTitles(e.target.value);
                resizeTextArea(e.target.value);
              }}
            ></textarea>
          </div>
          <div className={styles.description}>
            <textarea
              ref={txtDesRef}
              className={styles.des_textarea}
              placeholder="Nội dung bài viết"
              value={txtDes}
              onChange={(e) => {
                setTxtDes(e.target.value);
                resizeTextDes(e.target.value);
              }}
            ></textarea>
          </div>
          <div className={styles.button_trigger}>
            <span className={styles.btn_find} onClick={() => setOpenEdit(null)}>
              <h5>Cancel</h5>
            </span>
            <span className={styles.btn_find} onClick={() => updateImage()}>
              <h5>Save</h5>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupBlog;
