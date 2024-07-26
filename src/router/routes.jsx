import React, { lazy } from 'react';
import Role from '../constant/Role';
import ProtectedRoute from './ProtectedRoute';
import BlogStaff from '../components/cardBlogStaff/page.jsx';
import CategoryBlog from '../components/categoryBlog/page.jsx';
import ContestManagement from '../pages/ContestManagement/index.jsx';

import TopicManagement from '../pages/TopicManagement/index.jsx';
import ExaminerManagement from '../pages/ExaminerManagement/index.jsx';
import SponsorManage from '../pages/sponsorPage/page.jsx';
import CompetitorManage from '../pages/competitorManage/page.jsx';
import PaintingPage from '../pages/paintingPage/page.jsx';

const Home = lazy(() => import('../pages/Home/Home'));
const BlogPage = lazy(() => import('../pages/blogPage/BlogPage'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SubmitPage = lazy(() => import('../pages/SubmitPage'));
const Explore = lazy(() => import('../pages/Explore'));
const NoResult = lazy(() => import('../constant/NoResult'));
const StaffManage = lazy(() => import('../pages/StaffManage'));
const ContestDetail = lazy(
  () => import('../pages/ContestDetail/ContestDetail.jsx'),
);

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
        component: <ContestManagement />,
      },
      {
        path: 'blog',
        component: <BlogStaff />,
      },
      {
        path: 'category',
        component: <CategoryBlog />,
      },
      {
        path: 'topic',
        component: <TopicManagement />,
      },
      {
        path: 'examiner',
        component: <ExaminerManagement />,
      },
      {
        path: 'sponsor',
        component: <SponsorManage />,
      },
      {
        path: 'painting',
        component: <PaintingPage />,
      },
      {
        path: 'competitor',
        component: <CompetitorManage />,
      },
    ],
  },
  {
    path: '/submit',
    component: (
      <ProtectedRoute role={Role.COMPETITOR}>
        <SubmitPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/explore',
    component: (
      <ProtectedRoute>
        <Explore />
      </ProtectedRoute>
    ),
  },
  {
    path: '/blog',
    component: (
      <ProtectedRoute>
        <BlogPage />
      </ProtectedRoute>
    ),
  },
  { path: '/contest-detail/:id', component: <ContestDetail /> },
  { path: '/*', component: <NoResult /> },
];

export default routes;
