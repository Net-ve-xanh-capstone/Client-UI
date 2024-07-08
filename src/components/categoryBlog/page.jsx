import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Pagination } from '@mui/material';
import { getAllCategory } from '../../api/categoryApi.js';
import EditIcon from '@mui/icons-material/Edit';
import EditCategory from '../editCategory/page.jsx';
import AddIcon from '@mui/icons-material/Add';
import AddCatePopup from '../addCatePopup/page.jsx';

function CategoryBlog() {
  const [totalPage, setTotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [listCate, setListCate] = useState([]);
  const [openEdit, setOpenEdit] = useState(null);
  const [nameCate, setNameCate] = useState('');

  const [addPopup, setAddPopup] = useState(null);

  // adding id and value name of category to state
  const triggerEdit = (id, value) => {
    setOpenEdit(id);
    setNameCate(value);
  };

  // handle change navigation
  const handleChange = (_, value) => {
    setCurrentPage(value);
  };

  // get all category
  const fetchData = async () => {
    await getAllCategory(currentPage)
      .then((res) => {
        const data = res.data.result;
        setTotalPage(data.totalPage);
        setListCate(data.list);
      })
      .catch((err) => console.log(err));
  };

  // call data in first time join page
  useEffect(() => {
    fetchData();
  }, []);

  // recall data when change page
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      {openEdit !== null ? (
        <EditCategory
          idCategory={openEdit}
          textCategory={nameCate}
          fetchData={fetchData}
          setOpenEdit={setOpenEdit}
        />
      ) : (
        <>
          <h2 className={`tf-title pb-20 ${styles.main_title}`}>Quản Lý Thể Loại</h2>
          <div className={styles.section}>
            {listCate.length
              ? listCate.map((vl, _) => (
                  <div key={vl.id} className={styles.card}>
                    <h6>{vl.name}</h6>
                    <div className={styles.icon}>
                      <EditIcon
                        sx={{ fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => triggerEdit(vl.id, vl.name)}
                      />
                    </div>
                  </div>
                ))
              : ''}
            <div className={styles.addmore} onClick={() => setAddPopup(true)}>
              <AddIcon sx={{ fontSize: '4rem', color: 'white' }} />
            </div>
          </div>
          <Pagination
            count={totalPage}
            color="secondary"
            size="large"
            onChange={handleChange}
            sx={{
              width: '70%',
              display: 'flex',
              justifyContent: 'center',
              '.MuiPaginationItem-text': {
                fontSize: '1.5rem'
              },
              '.Mui-selected': {
                backgroundColor: '#5142fc !important', // Customize the selected item background color
                color: 'white' // Ensure text is readable on selected background
              }
            }}
          />
        </>
      )}
      {addPopup && <AddCatePopup handleClose={setAddPopup} fetchData={fetchData} />}
    </div>
  );
}

export default CategoryBlog;
