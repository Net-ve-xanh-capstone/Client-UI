import React, { useCallback, useEffect, useState } from 'react';
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
import { debounce } from 'lodash';

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
  const [filterCollections, setFilterCollections] = useState([]);
  const [open, setOpen] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
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

  const handleSearch = async (search) => {
    if (!collections) {
      return;
    }
    const filteredResults = collections.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    }
    );
    setFilterCollections(filteredResults);
  };

  const debouncedSearch = useCallback(
    debounce((query) => handleSearch(query), 500), 
    [collections] 
  );
  
  // Hàm xử lý sự thay đổi input
  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    debouncedSearch(value);
  };
  
  const onHide = () => {
    props.onHide();
    reset();
    setMessage('');
    setSearch('');
    setFilterCollections(collections);
  };
  
  const { isLoading, isError, data, error } = useFetchData(
    GET_ALL_COLLECTIONS_BY_ACCOUNT_ID, userInfo.Id
  );
  useEffect(() => {
    const collectionRes = data?.data?.result;
    if (collectionRes?.list?.length > 0) {
      setIndexTab(0);
      setCollections(collectionRes?.list);
      setFilterCollections(collectionRes?.list);
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
                {filterCollections && filterCollections.length > 0 ? (
                  <div>
                    <h3 className='mb-5'>Thêm vào bộ sưu tập</h3>
                    <Dropdown>
                      <Dropdown.Select
                        placeholder={getDropdownOptions(
                          'collection',
                          'Chọn collection của bạn',
                        )}></Dropdown.Select>
                      <Dropdown.List>
                        <Dropdown.Search defaultValue={search} onChange={
                          handleChange
                        }/>
                        {filterCollections.map((collection, index) => (
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
                Thêm vào bộ sưu tập mới
              </Link>
              {message && (
                <div className="mt-4">
                  <p>{message}</p>
                </div>
              )}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
};


export default CardCollectionModal;
