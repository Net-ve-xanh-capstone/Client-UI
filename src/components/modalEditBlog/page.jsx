import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { getBlogId, updateBlog } from '../../api/blogApi.js';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import { toast } from 'react-toastify';

function PopupBlog({ setOpenEdit, blogId, recallBlogData }) {
  const [txtTitles, setTxtTitles] = useState('');
  const [txtDes, setTxtDes] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePost, setImagePost] = useState('');
  const [supDesValue, setSupDes] = useState('');

  const { progress, url } = useUploadImage(imagePost);

  const txtTitle = useRef(null);
  const txtDesRef = useRef(null);
  const txtSupDes = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

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
    if (!txtTitle.current) {
      return;
    }
    if (value === ' ') {
      txtTitle.current.style.height = 'auto';
    }
    txtTitle.current.style.height = `${txtTitle.current.scrollHeight}px`;
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

  // adding new file image to state and loading to UI
  const changeFile = e => {
    if (
      !(
        e.target.files.length > 0 &&
        allowedTypes.includes(e.target.files[0].type)
      )
    ) {
      return;
    }
    setImagePost(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  // Get blog by id
  const fetchData = async id => {
    await getBlogId(id)
      .then(res => {
        const data = res.data.result;
        setTxtTitles(data.title);
        setTxtDes(data.description);
        setImageUrl(data.url);
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
    if (progress) {
      payload = {
        id: blogId,
        url: url,
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
    window.addEventListener('resize', resizeTextArea);
    window.addEventListener('resize', resizeTextDes);
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
                  onChange={e => changeFile(e)}
                />
              </>
            )}
          </div>
          {inputArea.map((vl, _) => (
            <div key={vl} className={styles.input_title}>
              <textarea
                ref={vl.ref}
                className={styles.title_textarea}
                placeholder={vl.placeHoder}
                value={vl.value}
                onChange={vl.onchange}></textarea>
            </div>
          ))}

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
