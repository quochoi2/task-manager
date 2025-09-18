import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 container mx-auto px-8 py-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout
