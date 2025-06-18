
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ContextualAIFab } from '@/components/ai/fab/ContextualAIFab';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F9FAFF]">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        <Outlet />
      </main>
      <ContextualAIFab />
    </div>
  );
};

export default MainLayout;
