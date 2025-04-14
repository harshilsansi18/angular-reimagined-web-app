
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, FileText, Settings, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: <Home size={18} /> },
    { to: '/heroes', label: 'Heroes', icon: <Users size={18} /> },
    { to: '/forms', label: 'Forms', icon: <FileText size={18} /> },
    { to: '/charts', label: 'Charts', icon: <BarChart2 size={18} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="h-16 border-b flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="bg-angular-red p-1 rounded">
            <svg width="28" height="28" viewBox="0 0 186 200" xmlns="http://www.w3.org/2000/svg">
              <polygon fill="#FFFFFF" points="93,0 0,33.2 14,156.3 93,200 172,156.3 186,33.2" />
              <polygon fill="#FFFFFF" points="93,0 0,33.2 14,156.3 93,200" transform="scale(0.5) translate(93, 0)" />
            </svg>
          </div>
          <span className="font-bold text-lg">Angular App</span>
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-6 py-3 hover:bg-gray-50 ${isActive ? 'text-angular-red border-r-2 border-angular-red bg-gray-50' : 'text-gray-600'}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
            <Users size={18} />
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
