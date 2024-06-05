import heroSliderData from "../assets/fake-data/data-slider-2";
import Footer from "../components/common/footer/Footer";
import HeaderVersion2 from "../components/common/header/HeaderVersion2";
import SliderStyle2 from "../components/slider/SliderStyle2";
import BrowCategory from "../layouts/home-1/BrowCategory";
import LiveAuction from "../layouts/home-1/LiveAuction";
import TodayPicks from "../layouts/home-1/TodayPicks";
import TopSeller from "../layouts/home-1/TopSeller";
import todayPickData from "../assets/fake-data/data-today-pick";
import PopularCollection from "../layouts/home-1/PopularCollection";
import Create from "../layouts/home-1/Create";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../constant/Fallback";

const Home1 = () => {
  return (
    <div className="home-5">
      <HeaderVersion2 />
      <SliderStyle2 data={heroSliderData} />
      <BrowCategory />
      <LiveAuction />
      <TopSeller />
      <TodayPicks data={todayPickData} />
      <PopularCollection />
      <Create />
      <Footer />
    </div>
  );
};

export default withErrorBoundary(Home1, {
  FallbackComponent: Fallback,
});
