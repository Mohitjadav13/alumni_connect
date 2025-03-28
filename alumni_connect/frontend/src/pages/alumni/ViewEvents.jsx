import React, { useState, useEffect } from "react";
import AlumniProfileModal from "../../components/AlumniProfileModal";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);

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
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Upcoming Events</h2>
          <p className="mt-2 text-gray-600">Discover and participate in upcoming alumni events</p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div 
                key={event._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.venue}</span>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3">{event.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Posted by: {event.createdBy?.name}</p>
                      <p className="text-sm text-gray-600">
                        {event.interestedUsers?.length || 0} interested
                      </p>
                    </div>
                    <button
                      onClick={() => handleShowInterest(event._id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        event.interestedUsers?.some(user => user._id === localStorage.getItem('userId'))
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {event.interestedUsers?.some(user => user._id === localStorage.getItem('userId'))
                        ? '✓ Interested' 
                        : 'Show Interest'}
                    </button>
                  </div>

                  {event.interestedUsers?.length > 0 && (
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="mt-4 w-full text-center text-blue-600 text-sm font-medium hover:underline"
                    >
                      View interested alumni
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No upcoming events</h3>
            <p className="mt-2 text-gray-600">Check back later for new events</p>
          </div>
        )}

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
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-line">{selectedEvent.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
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
          <AlumniProfileModal
            alumnus={selectedAlumnus}
            onClose={() => setSelectedAlumnus(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewEvents;