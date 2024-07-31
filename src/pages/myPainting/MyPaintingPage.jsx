import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/common/header/HeaderVersion1.jsx';
import Footer from '../../components/common/footer/Footer.jsx';
import Painting from '../../layouts/myPainting/Painting.jsx';
import widgetSidebarData from '../../assets/fake-data/data-widget-sidebar'
const MyPaintingPage = () => {
  return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Tranh Của Tôi</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Trang chủ</Link></li>
                                    <li>Tranh của tôi</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <Painting data={widgetSidebarData} />
            <Footer />
        </div>
    );
}

export default MyPaintingPage;
