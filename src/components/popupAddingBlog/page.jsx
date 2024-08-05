import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { addnewBlog } from '../../api/blogApi.js';
import { allCategory } from '../../api/categoryApi.js';
import ModalAddingImg from '../ModalAddingImage/page.jsx';
import styles from './page.module.css';

function AddNewBlog({ triggerClose, refetchData }) {
  const { userInfo } = useSelector(state => state.auth);
  const [listCategory, setListCategory] = useState([]);

  const [txtTitles, setTxtTitles] = useState('');
  const [txtDes, setTxtDes] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [loadingCategory, setLoadingCategoryr] = useState(false);

  // state handle popup
  const [openAddingImage, setOpenAddingImage] = useState(false);
  const [listImage, setListImage] = useState([]);

  const txtTitle = useRef(null);
  const txtDesRef = useRef(null);

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
      ref: txtDesRef,
      placeHoder: 'Nội dung bài viết',
      value: txtDes,
      onchange: e => {
        setTxtDes(e.target.value);
        resizeTextDes(e.target.value);
      },
    },
  ];

  // styling the dropdown select
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

  // close popup
  const handleClosePopup = () => {
    setOpenAddingImage(false);
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

  //auto resize fix with the content
  const resizeTextArea = value => {
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
  const resizeTextDes = value => {
    if (!txtDesRef.current) {
      return;
    }
    if (value === '') {
      txtDesRef.current.style.height = 'auto';
    }
    txtDesRef.current.style.height = `${txtDesRef.current.scrollHeight}px`;
  };

  //calling api to getting all of category not use
  const getCategory = async () => {
    setLoadingCategoryr(true);
    await allCategory()
      .then(res => {
        const data = res.data.result;
        setListCategory(data.map(vl => ({ value: vl.id, label: vl.name })));
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingCategoryr(false));
  };

  // post the blog with calling api
  const postBlog = async payload => {
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
          theme: 'light',
        });
        triggerClose(null);
        refetchData(1);
      })
      .catch(err => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  // accept the custom hook to get the url from firebase and go to post
  const postImage = () => {
    if (listImage.length > 0 && listImage.length !== null) {
      const payload = {
        images: [...listImage],
        title: txtTitles,
        url: 'https://dantri.com.vn/giai-tri/hoa-si-nguyen-the-dung-toi-ve-tranh-don-gian-khong-triet-ly-20231203044856389.htm',
        description: txtDes,
        categoryId: idCategory,
        currentUserId: userInfo.Id,
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
          theme: 'light',
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
        theme: 'light',
      });
    }
  };

  // call api in first time join page
  useEffect(() => {
    getCategory();
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
    <>
      <ModalAddingImg
        modalShow={openAddingImage}
        onHide={handleClosePopup}
        setListImage={setListImage}
        listImage={listImage}
      />
      <div className={`${styles.box} scrollbar`}>
        <div className={styles.scroll_section}>
          <div className={styles.title_line}>
            <h2 className={`tf-title pb-20 ${styles.title}`}>
              Tạo bài viết mới
            </h2>
            <CloseIcon
              onClick={() => triggerClose(null)}
              sx={{
                fontSize: '3rem',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* handle upload image */}
          <div className={styles.upload_image}>
            {listImage?.length > 0 ? (
              <div
                className={`${styles.grid_container} ${
                  listImage.length <= 2 && styles.grid_second_layout
                } ${listImage.length >= 3 && styles.grid_third_layout} ${
                  listImage.length === 1 && styles.grid_single_layout
                }`}>
                {listImage.slice(0, 3).map((val, idx) => (
                  <div
                    key={idx}
                    className={`${styles.grid_item} ${
                      listImage.length >= 3 && idx === 0 && styles.scale_grid
                    }`}
                    onClick={() => setOpenAddingImage(true)}>
                    <img
                      src={val.url}
                      alt="null"
                      className={styles.grid_image}
                    />
                    {idx === 2 && listImage.length > 3 && (
                      <div className={styles.quanliti_image}>
                        {`+${listImage.length - 3}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <label
                  htmlFor="add_more_file"
                  onClick={() => setOpenAddingImage(true)}
                  className={styles.onClick_upload}>
                  <CloudUploadIcon
                    sx={{ color: '#5142fc', fontSize: '20rem' }}
                  />
                </label>
              </>
            )}
          </div>
          {/* ending handle upload image */}

          {/* category */}
          <div className={styles.category_box}>
            <div className={styles.category}>
              <div className={styles.select_topic}>
                <Select
                  isClearable={true}
                  placeholder={<div>Thể loại</div>}
                  styles={customStyles}
                  options={listCategory}
                  isLoading={loadingCategory}
                  defaultValue={{ value: '', label: 'Thể loại' }}
                  onChange={val => setIdCategory(val?.value)}
                />
              </div>
            </div>
          </div>
          {/* ending category */}

          {/* text editor */}
          {inputArea.map(vl => (
            <div key={vl} className={styles.box_field}>
              <p style={{ fontSize: '2.2rem' }}>{vl.placeHoder}</p>
              <div className={styles.title_box}>
                <textarea
                  ref={vl.ref}
                  className={styles.title_input}
                  placeholder="...."
                  value={vl.value}
                  onChange={vl.onchange}></textarea>
              </div>
            </div>
          ))}
          {/*ending text editor */}

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
    </>
  );
}

export default AddNewBlog;
