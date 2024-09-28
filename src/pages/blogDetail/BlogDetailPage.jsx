import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/common/header/HeaderVersion2';
import Footer from '../../components/common/footer/Footer';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';
import { useQueries } from '@tanstack/react-query';
import { getAllBlog, getBlogId } from '../../api/blogApi.js';
import { cutString } from '../../utils/formatDate.js';

const BlogDetailPage = () => {
  const { blogId } = useParams();

  const [blogDetailQuery, blogRecentQuery] = useQueries({
    queries: [
      {
        queryKey: ['blogDetail', blogId],
        queryFn: () => getBlogId(blogId),
      },
      {
        queryKey: ['blogRecent'],
        queryFn: () => getAllBlog(1),
      },
    ],
  });

  const { data: blogDetail, isLoading: isLoadingDetail, isError: isErrorDetail, error: errorDetail } = blogDetailQuery;
  const { data: blogRecent, isLoading: isLoadingRecent, isError: isErrorRecent, error: errorRecent } = blogRecentQuery;

  const itemDetail = blogDetail?.data?.result || {};

  const recentArray = useMemo(() => {
    const filteredArray = (blogRecent?.data?.result?.list || []).filter(item => item.id !== blogId);
    for (let i = filteredArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredArray[i], filteredArray[j]] = [filteredArray[j], filteredArray[i]];
    }
    return filteredArray;
  }, [blogRecent, blogId]);

  if (isLoadingDetail || isLoadingRecent) return <span><DotLoaderCustom /></span>;

  if (isErrorDetail || isErrorRecent) return <p>Error: {errorDetail?.message || errorRecent?.message}</p>;
  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">BÀI VIẾT CHI TIẾT</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li><Link to="/">Trang chủ</Link></li>
                  <li>Bài viết chi tiết</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-section post-details">
        <div className="themesflat-container">
          <div className="wrap-flex-box style">
            <div className="post">
              <div className="inner-content">
                <h2 className="title-post">{itemDetail?.title}</h2>
                <div className="divider" />
                {itemDetail?.images.length > 0 && itemDetail.images.map((img, index) => (
                  <div key={index} className="image" style={{
                    marginBottom: '4rem',
                  }}>
                    <img src={img?.url} alt="Bài đọc" />
                  </div>
                ))}
                <div className="inner-post mg-t-24">
                  <h3 className="heading mg-bt-16">Nội dung</h3>
                  <p style={{
                    marginBottom: '1rem',
                    color: 'var(--primary-color6)',
                  }}>{itemDetail?.description}
                  </p>
                  <a href={itemDetail?.url}
                     style={{
                       fontSize: 18,
                     }}>
                    Đường dẫn bài đọc.
                  </a>
                </div>
                <div style={{
                  marginTop: '1rem',
                }} className="sc-widget style-1">
                  <div className="widget widget-tag style-2">
                    <h4>Chủ đề:</h4>
                    <p>{itemDetail?.categoryName}</p>
                  </div>
                  <div className="widget widget-social style-2">
                    <h4 className="title-widget">Chia sẻ:</h4>
                    <ul style={{ color: 'var(--primary-color6)' }}>
                      <li><Link to="#" className="icon-fl-facebook"></Link></li>
                      <li className="style-2"><Link to="#" className="icon-fl-coolicon"></Link></li>
                      <li className="mgr-none"><Link to="#" className="icon-fl-mess"></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="divider d2" />
              </div>
            </div>
            <div className="side-bar details">
              <div className="widget widget-recent-post mg-bt-43">
                <h3 className="title-widget mg-bt-23">Các bài viết khác</h3>
                <ul>
                  {
                    recentArray.map((item, index) => (
                      <li key={index} className="box-recent-post">
                        <div className="box-feature"><Link to="/blog-details"><img src={item?.images[0]?.url}
                                                                                   alt="bài đọc" /></Link>
                        </div>
                        <div className="box-content">
                          <Link to={`/blog-detail/${item?.id}`} className="title-recent-post">
                            {item.title?.length > 40
                              ? cutString(item.title, 40) + '...'
                              : item.title}
                          </Link>
                          <span className="sub-recent-post">
                            {item.text?.length > 20
                              ? cutString(item.text, 20) + '...'
                              : item.text}
                          </span>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BlogDetailPage;
