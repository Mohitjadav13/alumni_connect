import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      const data = await response.json();
      const validEvents = data.filter(event => event && event._id && event.title);
      setEvents(validEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleRemoveEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to remove this event?')) return;
    
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('You must be logged in');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
        alert('Event removed successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove event');
      }
    } catch (error) {
      console.error('Error removing event:', error);
      alert(error.message || 'Failed to remove event');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      return;
    }
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Faculty Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage events and alumni connections</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Create Events Link */}
          <Link 
            to="/faculty/create-events" 
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">Create Event</h3>
              <p className="text-sm opacity-90">Schedule a new event</p>
            </div>
          </Link>

          {/* View Alumni Link */}
          <Link 
            to="/faculty/view-alumni" 
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">View Alumni</h3>
              <p className="text-sm opacity-90">Browse alumni profiles</p>
            </div>
          </Link>

          {/* Notify Alumni Link */}
          <Link 
            to="/faculty/notify-alumni" 
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">Send Notifications</h3>
              <p className="text-sm opacity-90">Notify alumni about updates</p>
            </div>
          </Link>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
              <span className="text-sm text-gray-500">{events.length} events</span>
            </div>
          </div>
          
          {events.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div key={event._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div 
                      className="flex-1 cursor-pointer" 
                      onClick={() => setSelectedEvent(event)}
                    >
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">{event.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
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
                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2">
                      <Link 
                        to={`/faculty/edit-event/${event._id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleRemoveEvent(event._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No events created yet</h3>
              <p className="mt-2 text-gray-600">Create your first event to get started</p>
              <Link 
                to="/faculty/create-events"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Event
              </Link>
            </div>
          )}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Date & Time</span>
                    </div>
                    <p>{new Date(selectedEvent.date).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Venue</span>
                    </div>
                    <p>{selectedEvent.venue}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-700 whitespace-pre-line">{selectedEvent.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">
                      Interested Alumni ({selectedEvent.interestedUsers?.length || 0})
                    </h4>
                  </div>
                  
                  {selectedEvent.interestedUsers?.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {selectedEvent.interestedUsers?.map((alumnus) => (
                        <div 
                          key={alumnus._id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150"
                          onClick={() => setSelectedAlumnus(alumnus)}
                        >
                          <img
                            src={alumnus.profile?.basicInfo?.avatar || `https://ui-avatars.com/api/?name=${alumnus.name}`}
                            alt={alumnus.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{alumnus.name}</p>
                            <p className="text-sm text-gray-600 truncate">
                              {alumnus.profile?.basicInfo?.department || 'Department not specified'}
                              {alumnus.profile?.academic?.graduationYear && 
                                ` • Batch of ${alumnus.profile.academic.graduationYear}`}
                            </p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="mt-2 text-gray-600">No alumni have expressed interest yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alumni Profile Modal */}
        {selectedAlumnus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Alumni Profile</h2>
                <button 
                  onClick={() => setSelectedAlumnus(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <img
                      src={selectedAlumnus.profile?.basicInfo?.avatar || `https://ui-avatars.com/api/?name=${selectedAlumnus.name}`}
                      alt={selectedAlumnus.name}
                      className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedAlumnus.name}</h2>
                    <p className="text-gray-600 mb-4">{selectedAlumnus.email}</p>
                    
                    {selectedAlumnus.profile?.professional?.currentCompany && (
                      <p className="text-gray-700">
                        <span className="font-medium">Works at:</span> {selectedAlumnus.profile.professional.currentCompany}
                      </p>
                    )}
                    {selectedAlumnus.profile?.professional?.designation && (
                      <p className="text-gray-700">
                        <span className="font-medium">Position:</span> {selectedAlumnus.profile.professional.designation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Profile Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="bg-blue-50 p-5 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Basic Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Department</p>
                        <p>{selectedAlumnus.profile?.basicInfo?.department || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Graduation Year</p>
                        <p>{selectedAlumnus.profile?.academic?.graduationYear || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Degree</p>
                        <p>{selectedAlumnus.profile?.academic?.degree || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Location</p>
                        <p>{selectedAlumnus.profile?.basicInfo?.location || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Phone</p>
                        <p>{selectedAlumnus.profile?.basicInfo?.phone || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="bg-green-50 p-5 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Professional Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Current Company</p>
                        <p>{selectedAlumnus.profile?.professional?.currentCompany || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Designation</p>
                        <p>{selectedAlumnus.profile?.professional?.designation || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Experience</p>
                        <p>{selectedAlumnus.profile?.professional?.experience || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  {selectedAlumnus.profile?.professional?.skills?.length > 0 && (
                    <div className="bg-yellow-50 p-5 rounded-xl md:col-span-2">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedAlumnus.profile.professional.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {(selectedAlumnus.profile?.social?.linkedin || selectedAlumnus.profile?.social?.github) && (
                    <div className="bg-gray-50 p-5 rounded-xl md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Social Links
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {selectedAlumnus.profile?.social?.linkedin && (
                          <a 
                            href={selectedAlumnus.profile.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            LinkedIn Profile
                          </a>
                        )}
                        {selectedAlumnus.profile?.social?.github && (
                          <a 
                            href={selectedAlumnus.profile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 4.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                            </svg>
                            GitHub Profile
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;