import React, { lazy } from 'react';
import Role from '../constant/Role';
import ProtectedRoute from './ProtectedRoute';
import CollectionPage from '../pages/collection/CollectionPage.jsx';

const Home = lazy(() => import('../pages/Home/Home'));
const BlogPage = lazy(() => import('../pages/blogPage/BlogPage'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SubmitPage = lazy(() => import('../pages/SubmitPage'));
const NoResult = lazy(() => import('../constant/NoResult'));
const BlogStaff = lazy(() => import('../components/cardBlogStaff/page.jsx'));
const CategoryBlog = lazy(() => import('../components/categoryBlog/page.jsx'));
const ContestManagement = lazy(
  () => import('../pages/ContestManagement/index.jsx'),
);
const StaffManage = lazy(() => import('../pages/StaffManage'));
const ContestDetail = lazy(
  () => import('../pages/ContestDetail/ContestDetail.jsx'),
);
const ProfilePage = lazy(() => import('../pages/EditProfile/ProfilePage.jsx'));
const MyPaintingPage = lazy(() => import('../pages/myPainting/MyPaintingPage.jsx'));
const FAQPage = lazy(() => import('../pages/FAQ/FAQPage.jsx'));
const ContactPage = lazy(() => import('../pages/contact/ContactPage.jsx'));

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
      <ProtectedRoute>
        <BlogPage />
      </ProtectedRoute>
    ),
  },
  { path: '/contest-detail/:contestId', component: <ContestDetail /> },
  { path: '/faq', component: <FAQPage /> },
  { path: '/contact', component: <ContactPage /> },
  { path: '/collection', component: <CollectionPage /> },
  { path: '/collection/:accountId', 
    component: (
      <ProtectedRoute>
        <CollectionPage />
      </ProtectedRoute>
    )
  },
  { path: '/*', component: <NoResult /> },
];

export default routes;
