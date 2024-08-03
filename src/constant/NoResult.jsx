import { Link } from 'react-router-dom';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import { useState } from 'react';
import { Book, Home, InsertChart, Telegram, Window } from '@mui/icons-material';
import { color } from './Color.js';
const NoResult = () => {
  const [dataBox] = useState(
    [
      {
        icon: <Home sx={
          {
            color: color.white,
          }
        } />,
        url: '/',
        title: 'Trang chủ',
        description: 'Quay về trang chủ'
      },
      {
        icon: <Book sx={
          {
            color: color.white,
          }
        } />,
        url: 'blog',
        title: 'Bài đọc',
        description: 'Đọc thêm thông tin về các cuộc thi cũng như nhà tài trợ'
      },
      {
        icon: <InsertChart sx={
          {
            color: color.white,
          }
        } />,
        url: 'ranking',
        title: 'Bảng xếp hạng',
        description: 'Bảng xếp hạng thành tích của các thí sinh'
      },
      {
        icon: <Window sx={
          {
            color: color.white,
          }
        } />,
        url: 'collection',
        title: 'Bô sưu tập',
        description: 'Tham quan, chiêm ngưỡng bộ sưu tập từng mùa'
      },
      {
        icon: <Telegram sx={
          {
            color: color.white,
          }
        } />,
        url: 'contact',
        title: 'Liên hệ',
        description: 'Gửi lời nhắn cho chúng tôi nếu bạn cần sự giúp đỡ'
      },
    ]
  )
  return (
    <div>
      <HeaderVersion1 />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">KHÔNG CÓ KẾT QUẢ</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>
                    <Link to="#">Trang</Link>
                  </li>
                  <li>Không có kết quả</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-no-result tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                Xin lỗi, có thể nội dung bạn tìm không có trong hệ thống của chúng tôi
              </h2>
              <h5 className="sub-title help-center mg-bt-32 ">
                Hãy thử lại sau bạn nhé.
              </h5>
            </div>
          </div>
        </div>
        <div className="sc-box-icon-inner style-3">
          {
            dataBox.map((item, index) => (
              <div key={index} className={`sc-box-icon ${item.classnone}`}>
                <div className="icon">
                  <div className="icon-item">
                    {item.icon}
                  </div>
                </div>
                <h4 className="heading"><Link to={`${item.url}`}>{item.title}</Link></h4>
                <p className="content">{item.description}</p>
              </div>
            ))
          }
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default NoResult;
