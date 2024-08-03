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

const routes = [
  { path: '/', component: <Home /> },
  { path: '/login', component: <Login /> },
  { path: '/sign-up', component: <SignUp /> },
  {
    path: '/staff-management',
    component: (
      <ProtectedRoute role={Role.STAFF}>
        <StaffManage />
      </ProtectedRoute>
    ),
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
    path: '/submit/:contestId',
    component: (
      <ProtectedRoute role={Role.COMPETITOR}>
        <SubmitPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/edit-profile',
    component: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-painting',
    component: (
      <ProtectedRoute>
        <MyPaintingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/blog',
    component: (
      <BlogPage />
    ),
  },
  { path: '/contest-detail/:contestId', component: <ContestDetail /> },
  { path: '/faq', component: <FAQPage /> },
  { path: '/contact', component: <ContactPage /> },
  { path: '/collection', component: <CollectionPage /> },
  { path: '/collection-painting/:collectionId', component: <PaintingOfCollectionPage /> },
  {
    path: '/collection/:accountId',
    component: (
      <ProtectedRoute>
        <CollectionPage />
      </ProtectedRoute>
    ),
  },
  { path: '/*', component: <NoResult /> },
];

export default routes;
