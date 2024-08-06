import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/header/HeaderVersion1.jsx';
import Footer from '../../components/common/footer/Footer.jsx';
import { Accordion } from 'react-bootstrap-accordion';

const FAQPage = () => {
  const [data] = useState(
    [
      {
        key: '0',
        show: 'show',
        title: 'Cuộc thi Nét Vẽ Xanh là gì?',
        text: 'Hội thi Nét vẽ do sở Văn Hóa Thể Thao phối hợp với Sở GD&ĐT TP.HCM tổ chức. Là sân chơi nghệ thuật dành cho đối tượng thiếu nhi trong độ tuổi từ 4 đến 15, mục tiêu nhằm phát triển trí tưởng tượng, cảm xúc của các em từ sách và từ cảm nhận về cuộc sống chung quanh các em. Hội thi năm nay tập trung vào các thể loại vẽ tranh trên giấy A3.',
      },
      {
        key: '1',
        title: 'Đối tượng nào có thể tham gia?',
        text: 'Các em bé, thiếu nhi, học sinh có độ tuổi từ 4-15 đang học tập tại TP.HCM đều có thể tham gia cuộc thi',
      },
      {
        key: '2',
        title: 'Thời gian và địa điểm tổ chức cuộc thi là gì?',
        text: 'Cuộc thi Nét Vẽ Xanh sẽ được tổ chức online với vòng sơ khảo. Sau khi vào vòng chung khảo sẽ được tổ chức tại Trung tâm Văn hóa TP.HCM. Các em thí sinh cần có mặt trước 30 phút để làm thủ tục đăng ký và chuẩn bị. Để biết thêm thông tin chi tiết, vui lòng theo dõi thông báo trên website của Sở Văn Hóa Thể Thao TP.HCM.',
      },
      {
        key: '3',
        title: 'Có yêu cầu gì về chất liệu và kỹ thuật vẽ không?',
        text: 'Thí sinh tham gia cuộc thi cần sử dụng giấy vẽ A3 và có thể chọn các loại màu vẽ như màu nước, màu sáp, hoặc bút chì màu. Các tác phẩm không bị giới hạn về kỹ thuật, miễn là các em thể hiện được sự sáng tạo và cảm xúc của mình qua bức tranh.',
      },
      {
        key: '4',
        title: 'Làm thế nào để đăng ký tham gia cuộc thi?',
        text: 'Để đăng ký tham gia cuộc thi Nét Vẽ Xanh, các em cần đăng ký tài khoản của hệ thống Nét Vẽ Xanh, sau đó đăng ký tham gia cuộc thi với bản vẽ mềm, sau khi đăng ký cần nộp bản cứng về địa chỉ Trung tâm Văn hóa TP.HCM.',
      },
    ],
  );
  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">CÂU HỎI THƯỜNG GẶP</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li><Link to="/Client-UI">Trang chủ</Link></li>
                  <li>Câu hỏi thường gặp</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section wrap-accordion">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                Những câu hỏi bạn thắc mắc
              </h2>
              <h5 className="sub-title help-center mg-bt-32 ">
                Có thể được giải đáp tại đây bạn nhé!
              </h5>
            </div>
            <div className="col-md-12">
              <div className="flat-accordion2">
                {
                  data.map((item, index) => (
                    <Accordion key={index} title={item.title}>
                      <p>{item.text}</p>
                    </Accordion>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQPage;
