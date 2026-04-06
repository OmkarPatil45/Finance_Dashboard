import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-card border-b border-white/10 px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-[#00F0FF] font-bold text-xl">O</div>
        <h1 className="text-2xl font-semibold tracking-tight">Om Finance</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-sm">
          <span className="text-black">Role:</span>{' '}
          <span className="capitalize font-medium text-primary">{user?.role}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-black-200 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

