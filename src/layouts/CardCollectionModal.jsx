import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Dropdown } from '../components/dropdown';
import { useForm } from 'react-hook-form';

const CardCollectionModal = props => {
  const {
    watch,
    formState: { errors },
  } = useForm({});

  const getDropdownOptions = (data, defaultValue = '') => {
    const value = watch(data) || defaultValue;
    return value;
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value.name);
    setTopicId(value.id);
    setError(name, '');
  };

  const fakeCollectionArray = ['Collection 1', 'Collection 2', 'Collection 3'];

  return (
    <Modal animation scrollable show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div
        className="modal-body space-y-20 pd-40"
        style={{
          height: '500px',
        }}>
        <div className="flat-tabs themesflat-tabs">
          <Tabs>
            <TabList>
              <Tab>Đã có bộ sưu tập</Tab>
              <Tab>Chưa có bộ sưu tập</Tab>
            </TabList>

            <TabPanel className="mt-5" selected allowFullScreen>
              <h3>Thêm vào bộ sưu tập</h3>
              <div id="item-create" className="dropdown mt-5">
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getDropdownOptions(
                      'collection',
                      'Chọn collection của bạn',
                    )}></Dropdown.Select>
                  <Dropdown.List>
                    {fakeCollectionArray.map((collection, index) => (
                      <Dropdown.Option
                        key={index}
                        onClick={() =>
                          handleSelectDropdownOption('collection', collection)
                        }>
                        {collection}
                      </Dropdown.Option>
                    ))}
                  </Dropdown.List>
                </Dropdown>
              </div>

              <div className="hr"></div>

              <Link
                to="/wallet-connect"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                aria-label="Close">
                Thêm
              </Link>
            </TabPanel>

            <TabPanel className="mt-5" allowFullScreen>
              <h3>Tạo mới</h3>
              <input
                type="text"
                className="form-control mt-4"
                placeholder="1"
              />
              <div className="hr"></div>

              <Link
                to="/wallet-connect"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                aria-label="Close">
                Thêm
              </Link>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
};

export default CardCollectionModal;
