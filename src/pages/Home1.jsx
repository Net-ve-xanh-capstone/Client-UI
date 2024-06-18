import heroSliderData from '../assets/fake-data/data-slider-2';
import Footer from '../components/common/footer/Footer';
import HeaderVersion2 from '../components/common/header/HeaderVersion2';
import SliderStyle2 from '../components/slider/SliderStyle2';
import Contest from '../layouts/home/Contest';
import TodayPicks from '../layouts/home/TodayPicks';
import TopSeller from '../layouts/home/TopSeller';
import todayPickData from '../assets/fake-data/data-today-pick';
import PopularCollection from '../layouts/home/PopularCollection';
import Create from '../layouts/home/Create';

const Home1 = () => {
  return (
    <div className="home-5">
      <HeaderVersion2 />
      <SliderStyle2 data={heroSliderData} />
      <Contest />
      <TopSeller />
      <TodayPicks data={todayPickData} />
      <PopularCollection />
      <Create />
      <Footer />
    </div>
  );
};

export default Home1;
