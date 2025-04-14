
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LineChart, PieChart, FileText, Settings, CreditCard, Wallet, TrendingUp, DollarSign } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: <Home size={18} /> },
    { to: '/investments', label: 'Investments', icon: <TrendingUp size={18} /> },
    { to: '/transactions', label: 'Transactions', icon: <CreditCard size={18} /> },
    { to: '/portfolio', label: 'Portfolio', icon: <PieChart size={18} /> },
    { to: '/reports', label: 'Reports', icon: <FileText size={18} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-[#0a1631] border-r h-screen flex flex-col text-gray-300">
      <div className="h-16 border-b border-gray-800 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-1 rounded">
            <DollarSign size={24} className="text-white" />
          </div>
          <span className="font-bold text-lg text-white">JM Finance</span>
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-6 py-3 hover:bg-blue-900/30 ${isActive ? 'text-blue-400 border-r-2 border-blue-400 bg-blue-900/20' : 'text-gray-400'}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800 mt-auto">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 rounded-full w-10 h-10 flex items-center justify-center">
            <Wallet size={18} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Total Balance</p>
            <p className="text-xs text-blue-400">$124,500.00</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
