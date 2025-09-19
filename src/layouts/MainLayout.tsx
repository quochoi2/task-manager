import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-gray-50 overflow-hidden">
      <Header />
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 container mx-auto px-8 py-4 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
