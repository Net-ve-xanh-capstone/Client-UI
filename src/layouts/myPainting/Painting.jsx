import React from 'react';
import { Accordion } from 'react-bootstrap-accordion'
import PaintingItem from './PaintingItem.jsx';
import todayPickData from '../../assets/fake-data/data-today-pick';
import { useSelector } from 'react-redux';
import useFetchData from '../../hooks/useQueryData.js';

const Painting = props => {
  const fakeData = props.data;
  const { userInfo } = useSelector(state => state.auth);
  const { isLoading, isError, data, error }
    = useFetchData('paintings/listpaintingbyaccountid' , `${userInfo.Id}`);
  const painting = data?.data?.result?.list;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
    return (
        <section className="tf-explore tf-section">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-12">
                        <div id="side-bar" className="side-bar style-3">
                            { painting?.length > 0 ? fakeData.map((item,index) => (
                              <div className="widget widget-category mgbt-24 boder-bt" key={index}>
                                <div className="content-wg-category">
                                  <Accordion title={item.title} show={true}>
                                    <form action="#">
                                      {
                                        item.content.map((itemm , index) => (
                                          <div key={index}>
                                            <label>{itemm.field}
                                              <input type="checkbox" defaultChecked={itemm.checked} />
                                              <span className="btn-checkbox"></span>
                                            </label><br/>
                                          </div>
                                        ))
                                      }
                                    </form>
                                  </Accordion>
                                </div>
                              </div>
                            )) : null}
                        </div>
                    </div>
                    
                    <div className="col-xl-9 col-lg-9 col-md-12">
                        <PaintingItem data={ painting } loading={ isLoading }/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Painting;
