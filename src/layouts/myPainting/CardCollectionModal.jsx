import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Dropdown } from '../../components/dropdown/index.js';
import { useForm } from 'react-hook-form';
import useFetchData from '../../hooks/useQueryData.js';
import { TextareaCommon } from '../../components/textarea/TextareaCommon.jsx';
import TextFieldCommon from '../../components/input/TextfieldCommon.jsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { masterApi } from '../../api/masterApi.js';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const GET_ALL_COLLECTIONS_BY_ACCOUNT_ID = 'collections/getcollectionbyaccountid'
const CREATE_COLLECTION = 'collections'
const ADD_COLLECTION = 'paintingcollections/addpaintingtocollection'
const CardCollectionModal = props => {
  const schema = yup.object().shape({
    collection: yup.string().required('Vui lòng chọn bộ sưu tập'),
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
  const [refresh, setRefresh] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
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

  const useCustomMutation = (mutationFn, onSuccessMessage, onErrorMessage) => {
    return useMutation({
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries([GET_ALL_COLLECTIONS_BY_ACCOUNT_ID, userInfo.Id]);
        setMessage(onSuccessMessage);
      },
      onError: () => {
        setMessage(onErrorMessage);
      }
    });
  };

  const createCollectionMutation = useCustomMutation(
    (data) => masterApi.create(CREATE_COLLECTION, data),
    'Tạo bộ sưu tập thành công',
    'Tạo bộ sưu tập thất bại'
  );

  const addCollectionMutation = useCustomMutation(
    (data) => masterApi.create(ADD_COLLECTION, data),
    'Thêm vào bộ sưu tập thành công',
    'Thêm vào bộ sưu tập thất bại'
  );
  

  const handleCreateCollection = (e) => {
    const data = {
      name: e.name,
      description: e.description,
      currentUserId: userInfo.Id,
      listPaintingId: [paintingId]
    };
    createCollectionMutation.mutate(data);
  };
  
  const handleAddCollection = () => {
    const data = {
      collectionId: collectionId,
      paintingId: paintingId,
    }
    addCollectionMutation.mutate(data);
  }

  const handleSearch = async (search) => {
    if (!collections) {
      return;
    }
    const filteredResults = collections.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    });
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
  
  const handleChangeTab = (index) => {
    setIndexTab(index);
    reset();
    setMessage('');
    setSearch('');
    setFilterCollections(collections);
    setCollectionId('');
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
  }, [data, refresh]);
  
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
          <Tabs defaultIndex={indexTab} onSelect={handleChangeTab}>
            <TabList>
              <Tab>Đã có bộ sưu tập</Tab>
              <Tab>Chưa có bộ sưu tập</Tab>
            </TabList>

            <TabPanel className="mt-5" selected allowFullScreen>
              <div id="item-create" className="dropdown mt-5">
                {filterCollections && filterCollections.length > 0 ? (
                  <div>
                    <h3 className='mb-5'>Thêm vào bộ sưu tập</h3>
                    {errors.collection && (
                      <span className="text-danger h5">
                            {errors.collection.message}
                          </span>
                    )}
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
                      onClick={handleSubmit(handleAddCollection)}
                      className="btn btn-primary mt-4"
                      data-toggle="modal"
                      data-target="#popup_bid_success"
                      data-dismiss="modal"
                      aria-label="Close">
                      Thêm
                    </Link>
                    {message && (
                      <div className="mt-4 text-center">
                        <p style={{ color: '#000000', fontWeight: 'bold' }}>{message}</p>
                      </div>
                    )}
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
              <TextFieldCommon
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
                Thêm và tạo bộ sưu tập mới
              </Link>
              {message && (
                <div className="mt-4 text-center">
                  <p style={{ color: '#000000', fontWeight: 'bold' }}>{message}</p>
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
