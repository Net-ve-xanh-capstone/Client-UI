import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Dropdown } from '../components/dropdown';
import { useForm } from 'react-hook-form';
import useFetchData from '../hooks/useQueryData.js';
import { TextareaCommon } from '../components/textarea/TextareaCommon.jsx';
import TextfieldCommon from '../components/input/TextfieldCommon.jsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { masterApi } from '../api/masterApi.js';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close.js';

const GET_ALL_COLLECTIONS_BY_ACCOUNT_ID = 'collections/getcollectionbyaccountid'
const CREATE_COLLECTION = 'collections'
const CardCollectionModal = props => {
  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên của bộ sưu tập'),
  });
  const {
    watch,
    formState: { errors },
    setValue,
    setError,
    control,
    reset,
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });
  
  const [indexTab, setIndexTab] = useState(0);
  const [collections, setCollections] = useState([]);
  const [open, setOpen] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const [message, setMessage] = useState('');
  const userInfo = useSelector(state => state.auth.userInfo);
  const paintingId = props.paintingId;

  const getDropdownOptions = (data, defaultValue = '') => {
    const value = watch(data) || defaultValue;
    return value;
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value.name);
    setCollectionId(value.id);
    setError(name, '');
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleCreateCollection = (e) => {
    const data = {
      name: e.name,
      description: e.description,
      currentUserId: userInfo.Id,
      listPaintingId: [paintingId]
    }
    masterApi.create(CREATE_COLLECTION, data).then(res => {
      setOpen(true);
      if (res.status === 200) {
        setMessage('Tạo bộ sưu tập thành công');
      } else {
        setMessage('Tạo bộ sưu tập thất bại');
      }
    });
  }
  
  const onHide = () => {
    props.onHide();
    reset();
  };
  
  const { isLoading, isError, data, error } = useFetchData(
    GET_ALL_COLLECTIONS_BY_ACCOUNT_ID, userInfo.Id
  );
  useEffect(() => {
    const collectionRes = data?.data?.result;
    if (collectionRes?.list?.length > 0) {
      setIndexTab(0);
      setCollections(collectionRes?.list);
    } else {
      setIndexTab(1);
    }
  }, [data]);
  
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <Modal animation scrollable show={props.show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <div
        className="modal-body space-y-20 pd-40"
        style={{
          height: '500px',
        }}>
        <div className="flat-tabs themesflat-tabs">
          <Tabs defaultIndex={indexTab}>
            <TabList>
              <Tab>Đã có bộ sưu tập</Tab>
              <Tab>Chưa có bộ sưu tập</Tab>
            </TabList>

            <TabPanel className="mt-5" selected allowFullScreen>
              <div id="item-create" className="dropdown mt-5">
                {collections && collections.length > 0 ? (
                  <div>
                    <h3 className='mb-5'>Thêm vào bộ sưu tập</h3>
                    <Dropdown>
                      <Dropdown.Select
                        placeholder={getDropdownOptions(
                          'collection',
                          'Chọn collection của bạn',
                        )}></Dropdown.Select>
                      <Dropdown.List>
                        {collections.map((collection, index) => (
                          <Dropdown.Option
                            key={index}
                            onClick={() =>
                              handleSelectDropdownOption('collection', collection)
                            }>
                            {collection?.name}
                          </Dropdown.Option>
                        ))}
                      </Dropdown.List>
                    </Dropdown>
                    <Link
                      to="#"
                      className="btn btn-primary mt-4"
                      data-toggle="modal"
                      data-target="#popup_bid_success"
                      data-dismiss="modal"
                      aria-label="Close">
                      Thêm
                    </Link>
                  </div>
                ) : (
                  <div>
                    <h3>Bạn chưa có bộ sưu tập nào</h3>
                    <div id="item-create" className="dropdown mt-5">
                      <h4 className='text-center'>Hãy tạo bộ sưu tập mới</h4>
                    </div>
                  </div>
                )}
              </div>
              <div className="hr"></div>
            </TabPanel>

            <TabPanel className="mt-5" allowFullScreen>
              <h3 className='mb-15'>Tạo bộ sưu tập mới</h3>
              <TextfieldCommon
                control={control}
                error={errors.name?.message}
                id="name"
                name="name"
                tabIndex="1"
                placeholder="Nhập tên của bức tranh"
                className='mb-15'
                autoFocus
              />
              <div className="hr"></div>
              <TextareaCommon
                control={control}
                id="description"
                name="description"
                tabIndex="1"
                placeholder="Nhập mô tả của bức tranh"
                className='mb-15'
                autoFocus
              />
              <Link
                to="#"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                onClick={handleSubmit(handleCreateCollection)}
                aria-label="Close">
                Thêm
              </Link>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 6,
                    color: theme =>
                      theme.palette.grey[500],
                  }}>
                  <CloseIcon />
                </IconButton>
                <DialogContent>
                  <TypographyStyled className="h3 text-center">
                    {message}
                  </TypographyStyled>
                </DialogContent>
              </BootstrapDialog>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5),
  },
}));

const TypographyStyled = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: theme.typography.fontWeightMedium,
}));

export default CardCollectionModal;
