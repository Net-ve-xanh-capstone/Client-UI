import NoResult from '../constant/NoResult';
import Explore from '../pages/Explore';
import Home1 from '../pages/Home1';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SubmitPage from '../pages/SubmitPage';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  { path: '/', component: <Home1 /> },
  { path: '/login', component: <Login /> },
  { path: '/sign-up', component: <SignUp /> },
  { path: '/submit', component: <SubmitPage /> },
  {
    path: '/explore',
    component: (
      <ProtectedRoute>
        <Explore />
      </ProtectedRoute>
    )
  },
  { path: '/*', component: <NoResult /> }
];

export default routes;
