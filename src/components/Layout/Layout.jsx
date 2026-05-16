import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout-wrapper">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
