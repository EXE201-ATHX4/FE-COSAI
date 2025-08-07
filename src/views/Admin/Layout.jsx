import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: 20, minHeight: '100vh' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;