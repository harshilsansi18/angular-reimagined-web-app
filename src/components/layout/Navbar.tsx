
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <nav className="h-16 px-6 border-b bg-white flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md w-64">
          <Search size={16} className="text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="border-0 bg-transparent h-7 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell size={18} />
        </Button>
        <Link to="/profile" className="flex items-center gap-2">
          <div className="bg-angular-red rounded-full w-8 h-8 flex items-center justify-center text-white font-medium">
            JD
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
