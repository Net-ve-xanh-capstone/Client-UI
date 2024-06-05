import Footer from "../components/common/footer/Footer";
import HeaderVersion1 from "../components/common/header/HeaderVersion1";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../constant/Fallback";

const Home2 = () => {
  return (
    <div className="home-1">
      <HeaderVersion1 />
      {/**
      <Slider data={heroSliderData} />
      <LiveAuction data={liveAuctionData} />
      <TopSeller data={topSellerData} />
      <TodayPicks data={todayPickData} />
      <PopularCollection data={popularCollectionData} />
      <Create />
    */}
      <Footer />
    </div>
  );
};

export default withErrorBoundary(Home2, {
  FallbackComponent: Fallback,
});
