import Role from '../constant/Role';
import ProtectedRoute from './ProtectedRoute';
import React, { lazy } from 'react';

const Home1 = lazy(() => import('../pages/Home1'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SubmitPage = lazy(() => import('../pages/SubmitPage'));
const Explore = lazy(() => import('../pages/Explore'));
const NoResult = lazy(() => import('../constant/NoResult'));

const routes = [
  { path: '/', component: <Home1 /> },
  { path: '/login', component: <Login /> },
  { path: '/sign-up', component: <SignUp /> },
  {
    path: '/submit',
    component: (
      <ProtectedRoute role={Role.COMPETITOR}>
        <SubmitPage />
      </ProtectedRoute>
    )
  },
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
