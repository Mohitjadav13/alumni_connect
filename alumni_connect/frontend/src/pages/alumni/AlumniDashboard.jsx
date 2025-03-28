import React, { useState } from "react";
import { Link } from "react-router-dom";

const AlumniDashboard = () => {
  const [events] = useState([
    { id: 1, title: "Alumni Meet 2025", date: "2025-06-15", interested: false },
    { id: 2, title: "Tech Talk with Alumni", date: "2025-07-10", interested: false },
  ]);

  return (
    <div className="page-container">
      <h1 className="page-title">Welcome Back, Alumni!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Quick Stats</h2>
            <span className="text-blue-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-blue-600">{events.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Events Joined</p>
              <p className="text-2xl font-bold text-green-600">
                {events.filter(e => e.interested).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            <span className="text-blue-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/alumni/view-events" 
              className="btn-primary text-center">View Events</Link>
            <Link to="/alumni/view-alumni-profiles" 
              className="btn-secondary text-center">Network</Link>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div>
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
              <button
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  event.interested 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {event.interested ? '✓ Interested' : 'Show Interest'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
