import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';

interface LayoutProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Layout = ({ darkMode, onToggleDarkMode }: LayoutProps) => {
  return (
    <div className="d-flex">
      <Nav darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <div className="flex-grow-1 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="container p-4">
            <Breadcrumb />
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
