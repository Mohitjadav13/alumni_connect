import React, { useState } from "react";
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  const [events] = useState([
    { id: 1, title: "Alumni Meet 2025", date: "2025-06-15", participants: 45 },
    { id: 2, title: "Tech Talk with Alumni", date: "2025-07-10", participants: 32 },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="page-container">
      <h1 className="page-title">Faculty Dashboard</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/faculty/create-events" 
          className="card p-6 hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex flex-col items-center text-center">
            <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-lg font-semibold">Create Event</h3>
            <p className="text-sm opacity-90">Schedule a new event</p>
          </div>
        </Link>

        <Link to="/faculty/view-alumni" 
          className="card p-6 hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex flex-col items-center text-center">
            <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-semibold">View Alumni</h3>
            <p className="text-sm opacity-90">Browse alumni profiles</p>
          </div>
        </Link>

        <Link to="/faculty/notify-alumni" 
          className="card p-6 hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex flex-col items-center text-center">
            <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="text-lg font-semibold">Send Notifications</h3>
            <p className="text-sm opacity-90">Notify alumni about updates</p>
          </div>
        </Link>
      </div>

      {/* Upcoming Events */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
          <Link to="/faculty/create-events" className="btn-primary">Create New Event</Link>
        </div>
        <div className="divide-y divide-gray-200">
          {events.map((event) => (
            <div key={event.id} className="py-4 flex justify-between items-center">
              <div 
                className="flex-1 cursor-pointer hover:text-blue-600"
                onClick={() => setSelectedEvent(event)}
              >
                <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600">Date: {event.date}</p>
                <p className="text-sm text-gray-600">{event.participants} participants</p>
              </div>
              <div className="space-x-2">
                <button className="btn-secondary">Edit</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedEvent && (
          <ViewEventDetails 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
