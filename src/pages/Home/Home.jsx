import heroSliderData from '../../assets/fake-data/data-slider-2';
import Footer from '../../components/common/footer/Footer';
import HeaderVersion2 from '../../components/common/header/HeaderVersion2';
import SliderStyle2 from '../../components/slider/SliderStyle2';
import ContestComing from './layouts/ContestComing.jsx';
import Contest from './layouts/Contest.jsx';
import PopularCollection from './layouts/PopularCollection';
import Create from './layouts/Create';
const Home = () => {
    return (
        <div className="home-5">
            <HeaderVersion2 />
            <SliderStyle2 data={heroSliderData} />
            <Contest />
            <ContestComing />
            <PopularCollection />
            <Create />
            <Footer />
        </div>
    );
};

export default Home;
