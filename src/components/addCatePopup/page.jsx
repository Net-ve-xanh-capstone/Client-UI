import React, { useState } from 'react';
import styles from './page.module.css';
import { addnewCategory } from '../../api/categoryApi.js';

function AddCatePopup({ handleClose, fetchData }) {
  const [txtValue, setTxtValue] = useState('');

  // Add new category
  const triggerAdding = async () => {
    await addnewCategory({
      currentUserId: 'c4c9fb26-344a-44cb-ad18-6fc2d2604c4c',
      name: txtValue
    })
      .then(() => {
        fetchData();
        handleClose(null);
      })
      .catch((err) => console.log(err));
  };

  // closing popup
  const closePopup = () => {
    handleClose(null);
  };

  return (
    <>
      <div className={styles.overlayer}></div>
      <div className={styles.box}>
        <h2 className={`tf-title pb-20 ${styles.title}`}>Thêm mới thể loại</h2>
        <div className={styles.input_box}>
          <input
            type="text"
            value={txtValue}
            onChange={(e) => setTxtValue(e.target.value)}
            className={styles.txt_input}
          />
        </div>
        <div className={styles.btn}>
          <span className={styles.btn_find} onClick={() => closePopup()}>
            <h5>Cancel</h5>
          </span>
          <span className={styles.btn_find} onClick={() => triggerAdding()}>
            <h5>Add</h5>
          </span>
        </div>
      </div>
    </>
  );
}

export default AddCatePopup;
