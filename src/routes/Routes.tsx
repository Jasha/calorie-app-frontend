import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LazyElement from './LazyElement';
import ProtectedElement from './ProtectedElement';
import ROUTES from './constants';

const Login = React.lazy(() => import('pages/Login/Login'));
const SignUp = React.lazy(() => import('pages/SignUp/SignUp'));
const Home = React.lazy(() => import('pages/Home/Home'));
const Report = React.lazy(() => import('pages/Report/Report'));
const NotFound = React.lazy(() => import('pages/NotFound/NotFound'));

const CalorieRoutes: React.FC = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LazyElement Component={Login} />} />
    <Route path={ROUTES.SIGN_UP} element={<LazyElement Component={SignUp} />} />

    <Route path={ROUTES.HOME} element={<ProtectedElement Component={Home} />} />

    <Route
      path={ROUTES.REPORT}
      element={<ProtectedElement isForAdmin Component={Report} />}
    />

    <Route path="*" element={<LazyElement Component={NotFound} />} />
  </Routes>
);

export default CalorieRoutes;
