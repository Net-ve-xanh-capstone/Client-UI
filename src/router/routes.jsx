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
import CollectionPage from '../pages/collection/CollectionPage.jsx';
import PaintingOfCollectionPage from '../pages/collection/painting/PaintingOfCollectionPage.jsx';

const Home = lazy(() => import('../pages/Home/Home'));
const BlogPage = lazy(() => import('../pages/blogPage/BlogPage'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SubmitPage = lazy(() => import('../pages/SubmitPage'));
const NoResult = lazy(() => import('../constant/NoResult'));
const StaffManage = lazy(() => import('../pages/StaffManage'));
const ContestDetail = lazy(() =>
  import('../pages/ContestDetail/ContestDetail.jsx'),
);
const ProfilePage = lazy(() => import('../pages/EditProfile/ProfilePage.jsx'));
const MyPaintingPage = lazy(() =>
  import('../pages/myPainting/MyPaintingPage.jsx'),
);
const FAQPage = lazy(() => import('../pages/FAQ/FAQPage.jsx'));
const ContactPage = lazy(() => import('../pages/contact/ContactPage.jsx'));
const HistoryPage = lazy(() => import('../pages/history/HistoryPage.jsx'));

const routes = [
  { path: '/Client-UI/', component: <Home /> },
  { path: '/Client-UI/login', component: <Login /> },
  { path: '/Client-UI/sign-up', component: <SignUp /> },
  {
    path: '/Client-UI/staff-management',
    component: (
      <ProtectedRoute role={Role.STAFF}>
        <StaffManage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'Client-UI/contest',
        component: <ContestManagement />,
      },
      {
        path: 'Client-UI/blog',
        component: <BlogStaff />,
      },
      {
        path: 'Client-UI/category',
        component: <CategoryBlog />,
      },
      {
        path: 'Client-UI/topic',
        component: <TopicManagement />,
      },
      {
        path: 'Client-UI/examiner',
        component: <ExaminerManagement />,
      },
      {
        path: 'Client-UI/sponsor',
        component: <SponsorManage />,
      },
      {
        path: 'Client-UI/painting',
        component: <PaintingPage />,
      },
      {
        path: 'Client-UI/competitor',
        component: <CompetitorManage />,
      },
    ],
  },
  {
    path: 'Client-UI/submit/:contestId',
    component: (
      <ProtectedRoute role={Role.COMPETITOR}>
        <SubmitPage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'Client-UI/edit-profile',
    component: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'Client-UI/my-painting',
    component: (
      <ProtectedRoute>
        <MyPaintingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'Client-UI/blog',
    component: <BlogPage />,
  },
  { path: 'Client-UI/contest-detail/:contestId', component: <ContestDetail /> },
  { path: 'Client-UI/faq', component: <FAQPage /> },
  { path: 'Client-UI/contact', component: <ContactPage /> },
  { path: 'Client-UI/collection', component: <CollectionPage /> },
  {
    path: 'Client-UI/collection-painting/:collectionId',
    component: <PaintingOfCollectionPage />,
  },
  {
    path: 'Client-UI/collection/:accountId',
    component: (
      <ProtectedRoute>
        <CollectionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'Client-UI/history/:paintingId',
    component: (
      <ProtectedRoute>
        <HistoryPage />
      </ProtectedRoute>
    ),
  },
  { path: '/*', component: <NoResult /> },
];

export default routes;
