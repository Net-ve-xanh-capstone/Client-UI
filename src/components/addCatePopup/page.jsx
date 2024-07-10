import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { addnewCategory, updateCate } from '../../api/categoryApi.js';
import { toast } from 'react-toastify';

function AddCatePopup({
  handleClose,
  fetchData,
  isEdit = false,
  idCategory,
  textCategory,
  setOpenEdit
}) {
  const [txtValue, setTxtValue] = useState(`${isEdit ? textCategory : ''}`);

  // check all field in payload must be fill in
  const validation = (payload) => {
    for (const key in payload) {
      if (payload[key] === '' || payload[key] === null) {
        return false;
      }
    }
    return true;
  };

  // update the category
  const triggerUpdate = async () => {
    const payload = {
      id: idCategory,
      name: txtValue,
      currentUserId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    };
    if (validation(payload)) {
      await updateCate(payload)
        .then(() => {
          toast.success('Đã cập nhật thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
          fetchData();
          setOpenEdit(null);
        })
        .catch((err) => console.log(err));
    } else {
      toast.error('Xin hãy điền đầy đủ thông tin !!!', {
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

  // Add new category
  const triggerAdding = async () => {
    const payload = {
      currentUserId: 'c4c9fb26-344a-44cb-ad18-6fc2d2604c4c',
      name: txtValue
    };
    if (validation(payload)) {
      await addnewCategory(payload)
        .then(() => {
          toast.success('Đã Thêm mới thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
          fetchData();
          handleClose(null);
        })
        .catch((err) => console.log(err));
    } else {
      toast.error('Xin hãy điền đầy đủ thông tin !!!', {
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

  // closing popup
  const closePopup = () => {
    handleClose(null);
    setOpenEdit(null);
  };

  return (
    <div className={styles.box}>
      <h2 className={`tf-title pb-20 ${styles.title}`}>
        {isEdit ? `Chỉnh sửa thể loại` : 'Thêm mới thể loại'}
      </h2>
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
        {isEdit ? (
          <span className={styles.btn_find} onClick={() => triggerUpdate()}>
            <h5>Save</h5>
          </span>
        ) : (
          <span className={styles.btn_find} onClick={() => triggerAdding()}>
            <h5>Add</h5>
          </span>
        )}
      </div>
    </div>
  );
}

export default AddCatePopup;
