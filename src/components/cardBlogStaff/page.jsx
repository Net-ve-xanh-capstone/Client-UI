import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import fakeImage from '../../assets/images/blog/herosBlog.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteBlog, getAllBlog } from '../../api/blogApi.js';
import { Pagination, Skeleton } from '@mui/material';
import { cutString } from '../../utils/formatDate.js';
import PopupBlog from '../modalEditBlog/page.jsx';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import AddNewBlog from '../popupAddingBlog/page.jsx';
import { toast } from 'react-toastify';
import SearchOffIcon from '@mui/icons-material/SearchOff';
function BlogStaff() {
  const [popup, setPopup] = useState('');
  const [blogList, setBlogList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [openEdit, setOpenEdit] = useState(null);
  const [modalOpent, setModalOpen] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [isopenCreate, setisopenCreate] = useState(null);

  const [loading, setLoading] = useState(true);

  const handlePopup = idx => {
    setPopup(prev => (prev === idx ? '' : idx));
  };

  // change value of page when navigating
  const handleChange = (_, value) => {
    setPageNumber(value);
    fetchDataBlog(value);
  };

  // get all blog by staff
  const fetchDataBlog = async val => {
    setLoading(true);
    await getAllBlog(val)
      .then(res => {
        const data = res.data.result;
        setTotalPage(data.totalPage);
        setBlogList(data.list);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  // open model when click delete button
  const triggerModal = id => {
    setModalOpen(true);
    setIdDelete(id);
  };

  // close the model and cancel delete
  const handleCloseModal = () => {
    setModalOpen(null);
    setIdDelete(null);
  };

  // accept delete when click confirm on model
  const triggerDelete = async () => {
    await deleteBlog(idDelete)
      .then(() => {
        fetchDataBlog();
        setModalOpen(null);
        setIdDelete(null);
        toast.success('Xoá thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
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

  // fetch data when re-render
  useEffect(() => {
    fetchDataBlog(pageNumber);
  }, []);

  return (
    <>
      {isopenCreate ? (
        <AddNewBlog
          triggerClose={setisopenCreate}
          refetchData={fetchDataBlog}
        />
      ) : openEdit !== null ? (
        <PopupBlog
          setOpenEdit={setOpenEdit}
          blogId={openEdit}
          recallBlogData={fetchDataBlog}
        />
      ) : (
        <div className={styles.container}>
          <h2 className={`tf-title pb-20 ${styles.main_title}`}>
            Blog Của Tôi
          </h2>
          <div className={styles.blog_navigation}>
            <div className={styles.blog_list}>
              {loading ? (
                Array.from(new Array(5)).map((_, idx) => (
                  <Skeleton
                    className={styles.skeleton_card}
                    key={idx}
                    variant="rounded"
                  />
                ))
              ) : blogList?.length ? (
                blogList.map((vl, idx) => (
                  <div key={vl} className={styles.card}>
                    <div className={styles.image}>
                      <img src={vl.image} alt={vl.title} />
                    </div>
                    <div className={styles.text}>
                      <div className={styles.title}>
                        <div className={styles.check_btn}>
                          <h3>
                            {vl.title?.length > 20
                              ? cutString(vl.title, 20) + '...'
                              : vl.title}
                          </h3>
                          <MoreHorizIcon
                            onClick={() => handlePopup(idx)}
                            sx={{
                              color: '#9835FB',
                              fontSize: '3rem',
                              cursor: 'pointer',
                            }}
                          />
                          {popup === idx && (
                            <div className={styles.poup}>
                              <span onClick={() => setOpenEdit(vl.id)}>
                                <h6>Edit</h6>
                              </span>
                              <span onClick={() => triggerModal(vl.id)}>
                                <h6>Delete</h6>
                              </span>
                            </div>
                          )}
                        </div>
                        <p>
                          {vl.description?.length > 200
                            ? cutString(vl.description, 200) + '...'
                            : vl.description}
                        </p>
                      </div>
                      <div className={styles.tag_list}>
                        <div className={styles.tag}>
                          <span
                            style={{
                              backgroundColor: '#9835FB',
                            }}></span>
                          <h6
                            style={{
                              color: '#9835FB',
                            }}>
                            {vl.categoryName?.length > 20
                              ? cutString(vl.categoryName, 20) + '...'
                              : vl.categoryName}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.not_found}>
                  <SearchOffIcon sx={{ fontSize: '10rem', color: '#7a798a' }} />
                  <h2 className={`tf-title pb-20 ${styles.notfound_title}`}>
                    Không có bài viết nào
                  </h2>
                </div>
              )}
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
                  fontSize: '1.5rem',
                },
                '.Mui-selected': {
                  backgroundColor: '#5142fc !important', // Customize the selected item background color
                  color: 'white', // Ensure text is readable on selected background
                },
              }}
            />
          </div>
        </div>
      )}

      {/* confirm delete button */}
      <Modal show={modalOpent} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc là sẽ xoá bài viết này không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={triggerDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {openEdit === null && !isopenCreate && (
        <div className={styles.btn_add} onClick={() => setisopenCreate(true)}>
          <AddIcon
            sx={{
              fontSize: '4rem',
              color: 'white',
            }}
          />
        </div>
      )}
    </>
  );
}

export default BlogStaff;
