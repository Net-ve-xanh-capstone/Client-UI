import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/common/header/HeaderVersion1.jsx';
import Footer from '../../components/common/footer/Footer.jsx';
import img1 from '../../assets/images/blog/contact.png'

const ContactPage = () => {
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">LIÊN HỆ</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Trang chủ</Link></li>
                                    <li><Link to="#">Trang</Link></li>
                                    <li>Liên hệ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <section className="tf-contact tf-section">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="box-feature-contact">
                                <img src={img1} alt="Axies" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <h2 className="tf-title-heading style-2 mg-bt-12">
                                Gửi lời nhắn bạn
                            </h2>
                            <h5 className="sub-title style-1">
                                Nếu bạn có thắc mắc, hay câu hỏi gì cứ gửi đây cho chúng tôi nhé
                            </h5>
                            <div className="form-inner">
                                <form id="contactform" noValidate="novalidate" className="form-submit" >
                                    <input id="name" name="name" tabIndex="1" aria-required="true" type="text" placeholder="Họ tên của bạn" required />
                                    <input id="email" name="email" tabIndex="2"  aria-required="true" type="email" placeholder="Email của bạn" required />
                                    <div className="row-form style-2" id="subject">
                                        <select>
                                            <option value="1">Khiếu nại</option>
                                            <option value="2">Hỗ trợ</option>
                                            <option value="3">Đề xuất</option>
                                        </select>
                                        <i className="icon-fl-down"></i>
                                    </div>
                                    <textarea id="message" name="message" tabIndex="3" aria-required="true" required placeholder="Lời nhắn"></textarea>
                                    <button className="submit">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default ContactPage;
