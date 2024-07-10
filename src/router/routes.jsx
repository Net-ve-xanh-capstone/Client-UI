import React, { lazy } from 'react';
import Role from '../constant/Role';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(() => import('../pages/Home/Home'));
const BlogPage = lazy(() => import('../pages/blogPage/BlogPage'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SubmitPage = lazy(() => import('../pages/SubmitPage'));
const Explore = lazy(() => import('../pages/Explore'));
const NoResult = lazy(() => import('../constant/NoResult'));
const BlogStaff = lazy(() => import('../components/cardBlogStaff/page.jsx'));
const CategoryBlog = lazy(() => import('../components/categoryBlog/page.jsx'));
const ContestManagement = lazy(() => import('../pages/ContestManagement/index.jsx'));
const StaffManage = lazy(() => import('../pages/StaffManage'));

const routes = [
  { path: '/', component: <Home /> },
  { path: '/login', component: <Login /> },
  { path: '/sign-up', component: <SignUp /> },
  {
    path: '/staff-management',
    component: <StaffManage />,
    children: [
      {
        path: 'contest',
        component: <ContestManagement />
      },
      {
        path: 'blog',
        component: <BlogStaff />
      },
      {
        path: 'category',
        component: <CategoryBlog />
      }
    ]
  },
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
  {
    path: '/blog',
    component: (
      <ProtectedRoute>
        <BlogPage />
      </ProtectedRoute>
    )
  },
  { path: '/*', component: <NoResult /> }
];

export default routes;
