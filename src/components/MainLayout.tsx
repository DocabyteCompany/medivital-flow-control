
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F9FAFF]">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
