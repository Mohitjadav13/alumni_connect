import React, { useState, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const FacultyLayout = () => {
  const { user } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  return (
    <div>
      <nav className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/faculty" className="text-xl font-bold">Faculty Portal</Link>
              <div className="flex space-x-4">
                {[
                  { path: '/faculty', label: 'Dashboard' },
                  { path: '/faculty/create-events', label: 'Create Event' },
                  { path: '/faculty/view-alumni', label: 'Alumni List' },
                  { path: '/faculty/notify-alumni', label: 'Notifications' }
                ].map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`px-3 py-2 rounded-md ${
                      location.pathname === path 
                        ? 'bg-green-700' 
                        : 'hover:bg-green-700'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 hover:bg-green-700 px-3 py-2 rounded-md"
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user?.name}</span>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/faculty/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => {/* Add logout handler */}}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default FacultyLayout;
