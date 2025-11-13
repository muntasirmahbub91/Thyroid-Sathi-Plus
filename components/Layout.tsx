
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
