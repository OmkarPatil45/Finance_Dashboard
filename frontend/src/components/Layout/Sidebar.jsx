import { NavLink } from 'react-router-dom';
import { LayoutDashboard, List, Users } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-64 bg-card border-r border-white/10 min-h-screen p-6 flex flex-col">
      <div className="mb-12">
        <h2 className="text-primary text-xl font-bold tracking-widest">DASHBOARD</h2>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive ? 'bg-primary text-black' : 'hover:bg-black/20'}`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Overview</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive ? 'bg-primary text-black' : 'hover:bg-black/20'}`}
        >
          <List size={20} />
          <span className="font-medium">Transactions</span>
        </NavLink>

        {user?.role === 'admin' && (
          <NavLink
            to="/users"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive ? 'bg-primary text-black' : 'hover:bg-black/20'}`}
          >
            <Users size={20} />
            <span className="font-medium">Users</span>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;