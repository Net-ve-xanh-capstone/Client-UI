import NoResult from "../constant/NoResult";
import Explore from "../pages/Explore";
import Home1 from "../pages/Home1";
import Home2 from "../pages/Home2";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const routes = [
  { path: "/", component: <Home1 /> },
  { path: "/home-2", component: <Home2 /> },
  { path: "/login", component: <Login /> },
  { path: "/sign-up", component: <SignUp /> },
  { path: "/explore", component: <Explore /> },
  { path: "/*", component: <NoResult /> },
];

export default routes;
