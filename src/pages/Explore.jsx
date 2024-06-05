import { Link } from "react-router-dom";
import todayPickData from "../assets/fake-data/data-today-pick";
import TodayPicks from "../layouts/explore/TodayPicks";
import HeaderVersion1 from "../components/common/header/HeaderVersion1";
import Footer from "../components/common/footer/Footer";

const Explore = () => {
  return (
    <div>
      <HeaderVersion1 />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Explore</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Explore</Link>
                  </li>
                  <li>Explore 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TodayPicks data={todayPickData} />
      <Footer />
    </div>
  );
};

export default Explore;
