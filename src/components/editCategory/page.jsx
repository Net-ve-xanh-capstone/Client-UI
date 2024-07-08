import React, { useState } from 'react';
import { deleteCate, updateCate } from '../../api/categoryApi.js';
import styles from './page.module.css';

function EditCategory({ idCategory, textCategory, fetchData, setOpenEdit }) {
  const [valueInput, setValueInput] = useState(textCategory);

  const triggerUpdate = async () => {
    await updateCate({
      id: idCategory,
      name: valueInput,
      currentUserId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    })
      .then(() => {
        fetchData();
        setOpenEdit(null);
      })
      .catch((err) => console.log(err));
  };

  const deleteCategory = async () => {
    await deleteCate(idCategory)
      .then(() => {
        fetchData();
        setOpenEdit(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <h2 className={`tf-title pb-20 ${styles.main_title}`}>Chỉnh sữa thể loại</h2>
      <div className={styles.section}>
        <div className={styles.edit}>
          <input
            className={styles.input_box}
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
        </div>
        <div className={styles.btn_trigger}>
          <span className={styles.btn_find} onClick={() => setOpenEdit(null)}>
            <h5>Cancel</h5>
          </span>
          <span className={styles.btn_find} onClick={() => deleteCategory()}>
            <h5>Delete</h5>
          </span>
          <span className={styles.btn_find} onClick={() => triggerUpdate()}>
            <h5>Save</h5>
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
