import React, { useState,useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


const AlumniDashboard = () => {
  const [events, setEvents] = useState([]);
  const { user, setUser } = useContext(AuthContext); // Add setUser from context
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      const data = await response.json();
      const validEvents = data.filter(event => 
        event.createdBy && 
        new Date(event.date) >= new Date()
      );
      setEvents(validEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleShowInterest = async (eventId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/interest`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      
      if (response.ok) {
        await fetchEvents();
      }
    } catch (error) {
      console.error('Error updating interest:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back, {user?.name}!</h1>
          <p className="mt-2 text-gray-600">Stay connected with your alma mater</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Events Count */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{events.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Interested Events */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Events Interested In</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {events.filter(e => e.interestedUsers?.some(user => user._id === localStorage.getItem('userId'))).length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Quick Links</p>
                <div className="flex space-x-4 mt-3">
                  <Link to="/alumni/view-events" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    All Events
                  </Link>
                  <Link to="/alumni/profile" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    My Profile
                  </Link>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
          </div>

          {events.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div key={event._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">{event.title}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.venue}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {event.interestedUsers?.length || 0} interested
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mt-3 line-clamp-2">{event.description}</p>
                      <p className="text-sm text-gray-500 mt-2">Posted by: {event.createdBy?.name}</p>
                    </div>
                    
                    <button
                      onClick={() => handleShowInterest(event._id)}
                      className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        event.interestedUsers?.some(user => user._id === localStorage.getItem('userId'))
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {event.interestedUsers?.some(user => user._id === localStorage.getItem('userId'))
                        ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Interested
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Show Interest
                          </>
                        )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No upcoming events</h3>
              <p className="mt-2 text-gray-600">Check back later for new events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;