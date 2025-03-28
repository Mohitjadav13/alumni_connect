import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    alumni: 0,
    faculty: 0,
    events: 0
  });

  const fetchCounts = async () => {
    try {
      // Get alumni count
      const alumniRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/alumni`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      const alumniData = await alumniRes.json();

      // Get faculty count
      const facultyRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/faculty`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      const facultyData = await facultyRes.json();

      setCounts({
        alumni: alumniData.length,
        faculty: facultyData.length,
        events: 5 // You can make this dynamic too if needed
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const stats = [
    { title: "Total Alumni", count: counts.alumni, color: "bg-blue-500" },
    { title: "Active Faculty", count: counts.faculty, color: "bg-green-500" },
    { title: "Events This Month", count: counts.events, color: "bg-purple-500" },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6 flex items-center">
            <div className={`${stat.color} rounded-full p-3 mr-4`}>
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/add-alumni" className="card p-6 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Add Alumni</h3>
              <p className="text-sm text-gray-600">Add new alumni to the system</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/add-faculty" className="card p-6 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Add Faculty</h3>
              <p className="text-sm text-gray-600">Add new faculty members</p>
            </div>
          </div>
        </Link>

        <Link to="/send-emails" className="card p-6 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Send Emails</h3>
              <p className="text-sm text-gray-600">Broadcast messages to users</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/alumni-list" 
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <span className="text-blue-600 font-medium">View Alumni List →</span>
          </Link>
          <Link to="/faculty-list"
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <span className="text-green-600 font-medium">View Faculty List →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
