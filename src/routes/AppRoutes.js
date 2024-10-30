import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import ProtectedRoutes from './ProtectedRoutes';
// import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/*' element={<PublicRoutes/>}></Route>
        <Route path='/auth/*' element={<AuthRoutes/>}></Route>
        <Route path='/dashboard/*' element={<ProtectedRoutes/>}></Route>
        {/* <Route path='*' element={<NotFoundPage/>}></Route> */}

    </Routes>
  )
}
