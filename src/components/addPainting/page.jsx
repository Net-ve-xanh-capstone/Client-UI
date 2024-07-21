import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import styles from './page.module.css';
import { contestApi } from '../../api/contestApi.js';
import { getAllCompetitor } from '../../api/competitor.js';

function AddPainting({ setOpenCreate, paintingByid, setPaintingByid }) {
  const textAreaRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(paintingByid ? paintingByid.image : null);
  const [imagePost, setImagePost] = useState(null);
  const [txtTitles, setTxtTitles] = useState('');

  const [loadingAccount, setLoadingAccount] = useState(false);
  const [nameAccount, setNameAccount] = useState([]);

  const [topicData, setTopicData] = useState([]);

  const { progress, url } = useUploadImage(imagePost);

  // styling the topic label
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'transparent',
      border: 0,
      // match with the menu
      borderRadius: state.isFocused ? '2rem' : '2rem',
      color: '#070F2B',
      // Overwrittes the different states of border
      borderColor: 'none !important',
      // Removes weird border around container
      boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
      height: '5rem',
      fontSize: '1.5rem !important',
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: 'none'
      }
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const changeFile = (e) => {
    if (!(e.target.files.length > 0 && allowedTypes.includes(e.target.files[0].type))) {
      return;
    }
    setImagePost(e.target.files[0]);
    setImageLoaded(URL.createObjectURL(e.target.files[0]));
  };

  const resizeTextDes = (value) => {
    if (!textAreaRef.current) {
      return;
    }
    if (value === '') {
      textAreaRef.current.style.height = 'auto';
    }
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  // get all contest and competitor
  const getRoundTopic = async () => {
    setLoadingAccount(true);
    try {
      const res = await Promise.all([
        contestApi.getAll('contests/getallcontest'),
        getAllCompetitor()
      ]);
      const dataCompetitor = res[1].data.result;
      setNameAccount(dataCompetitor.map((val) => ({ value: val.id, label: val.username })));
      // this calling new data about topicround and then put that into topicData state
      setTopicData(dataCompetitor.map((val) => ({ value: val.id, label: val.username })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAccount(false);
    }
  };

  // resize the box whilt input text
  useEffect(() => {
    window.addEventListener('resize', resizeTextDes);
    return () => {
      window.removeEventListener('resize', () => resizeTextDes(txtTitles));
    };
  }, [txtTitles]);

  useEffect(() => {
    getRoundTopic();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={`tf-title pb-20 ${styles.main_title}`}>
        {paintingByid ? 'Cập nhật bài dự thi' : 'Thêm bài dự thi'}
      </h2>
      {/* adding image zone */}
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
              <AddPhotoAlternateIcon sx={{ color: '#5142fc', fontSize: '20rem' }} />
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
      {/* end adding image zone */}

      {/* adding field */}
      <div className={styles.detail}>
        <Select
          isClearable={true}
          placeholder={<div>Tên thí sinh</div>}
          styles={customStyles}
          options={nameAccount}
          isLoading={loadingAccount}
        />
        <div className={styles.code}>
          <input type="text" placeholder="Nhập tên tranh..." className={styles.input_code} />
        </div>
        {/* <div className={styles.owner_name}>
          <input type="text" placeholder="Nhập tên tác giả..." className={styles.input_owner} />
        </div> */}
        <Select
          isClearable={true}
          placeholder={<div>Chọn chủ đề</div>}
          styles={customStyles}
          isLoading={loadingAccount}
          options={topicData}
        />
      </div>
      {/* ending add field */}
      <div className={styles.title_box}>
        <textarea
          ref={textAreaRef}
          className={styles.title_input}
          placeholder="Nhập thông điệp..."
          value={txtTitles}
          onChange={(e) => {
            setTxtTitles(e.target.value);
            resizeTextDes(e.target.value);
          }}
        ></textarea>
      </div>

      {/* btn zone */}
      <div className={styles.btn_zone}>
        <span
          className={styles.btn_find}
          onClick={() => {
            setOpenCreate(null);
            setPaintingByid(null);
          }}
        >
          <h5>Huỷ</h5>
        </span>
        <span className={styles.btn_find}>
          <h5>Lưu</h5>
        </span>
      </div>
      {/* ending btn zone */}
    </div>
  );
}

export default AddPainting;
