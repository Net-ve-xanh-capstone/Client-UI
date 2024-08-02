import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../../components/common/header/HeaderVersion2';
import Footer from '../../../components/common/footer/Footer.jsx';
import PaintingPicks from '../../../layouts/collection/PaintingPicks.jsx';
import useFetchData from '../../../hooks/useQueryData.js';
import DotLoaderCustom from '../../../components/dotLoader/DotLoader.jsx';

const GET_ALL_PAITING_OF_COLLECTION = 'collections/Painting';
const PaintingOfCollectionPage = () => {
  const { collectionId } = useParams();
  const {
    isLoading,
    isError,
    data,
    error,
  } = useFetchData(GET_ALL_PAITING_OF_COLLECTION, collectionId);
  const paintingData = data?.data?.result?.painting;
  const collectionName = data?.data?.result?.name;
  if (isLoading) {
    return <span><DotLoaderCustom /></span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Bộ sưu tập {collectionName}</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Trang</Link></li>
                                    <li>Bộ sưu tập {collectionName}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <PaintingPicks data={paintingData} />
            <Footer />
        </div>
    );
}


export default PaintingOfCollectionPage;
