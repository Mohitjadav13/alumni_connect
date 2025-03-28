import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    alumni: 0,
    faculty: 0,
  });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);

  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const [alumniRes, facultyRes, eventsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/admin/alumni`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/admin/faculty`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/events`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const [alumniData, facultyData, eventsData] = await Promise.all([
        alumniRes.json(),
        facultyRes.json(),
        eventsRes.json()
      ]);

      // Filter out events with no department or expired dates
      const validEvents = eventsData.filter(event => {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return (
          event.createdBy?.profile?.basicInfo?.department && 
          eventDate >= currentDate
        );
      });

      setCounts({
        alumni: alumniData.length,
        faculty: facultyData.length,
      });
      setEvents(validEvents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const stats = [
    { 
      title: "Total Alumni", 
      count: counts.alumni, 
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: "/alumni-list" 
    },
    { 
      title: "Active Faculty", 
      count: counts.faculty, 
      color: "bg-gradient-to-r from-green-500 to-green-600",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: "/faculty-list"
    },
    { 
      title: "Upcoming Events", 
      count: events.length, 
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => setSelectedEvent(true)
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.color} rounded-xl shadow-lg overflow-hidden text-white transform hover:scale-[1.02] transition-transform duration-200`}
              onClick={stat.onClick}
            >
              {stat.link ? (
                <Link to={stat.link} className="block p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-white bg-opacity-20 mr-4">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-80">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.count}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="p-6 cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-white bg-opacity-20 mr-4">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-80">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.count}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              to="/admin/add-alumni" 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
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

            <Link 
              to="/admin/add-faculty" 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100 hover:border-green-200"
            >
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
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

            <Link 
              to="/send-emails" 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100 hover:border-purple-200"
            >
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
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
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">5 new alumni registered today</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">3 faculty profiles updated</p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New event "Alumni Meet 2023" created</p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center border-b p-6">
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
                <button 
                  onClick={() => setSelectedEvent(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto p-6">
                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map(event => (
                      <div key={event._id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                              <p className="text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              <p className="text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.venue}
                              </p>
                            </div>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {event.createdBy?.profile?.basicInfo?.department || 'General'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <p className="text-gray-500 text-sm mb-2">
                          Posted by: {event.createdBy?.name} ({event.createdBy?.email})
                        </p>
                        
                        {/* Interested Alumni Section */}
                        <div className="mt-4 border-t pt-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Interested Alumni ({event.interestedUsers?.length || 0})
                          </h4>
                          <div className="max-h-60 overflow-y-auto">
                            {event.interestedUsers?.length > 0 ? (
                              event.interestedUsers.map((alumnus) => (
                                <div
                                  key={alumnus._id}
                                  onClick={() => setSelectedAlumnus(alumnus)}
                                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                >
                                  <img
                                    src={alumnus.profile?.basicInfo?.avatar || `https://ui-avatars.com/api/?name=${alumnus.name}&background=random`}
                                    alt={alumnus.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-800 truncate">{alumnus.name}</p>
                                    <p className="text-sm text-gray-600 truncate">
                                      {alumnus.profile?.basicInfo?.department || 'No department'} 
                                      {alumnus.profile?.academic?.graduationYear && ` • ${alumnus.profile.academic.graduationYear}`}
                                    </p>
                                  </div>
                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-4 text-gray-500">
                                No alumni have expressed interest yet
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">No Upcoming Events</h3>
                    <p className="text-gray-500 mt-2 max-w-md mx-auto">
                      There are currently no upcoming events scheduled. Create a new event to engage with alumni and faculty.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Create New Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Alumni Profile Modal */}
        {selectedAlumnus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center border-b p-6">
                <h2 className="text-2xl font-bold text-gray-800">Alumni Profile</h2>
                <button 
                  onClick={() => setSelectedAlumnus(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <img
                      src={selectedAlumnus.profile?.basicInfo?.avatar || `https://ui-avatars.com/api/?name=${selectedAlumnus.name}&background=random`}
                      alt={selectedAlumnus.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedAlumnus.name}</h2>
                    <p className="text-gray-600 mb-2">{selectedAlumnus.email}</p>
                    <p className="text-gray-600 mb-4">{selectedAlumnus.profile?.basicInfo?.phone}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {selectedAlumnus.profile?.basicInfo?.department || 'No department'}
                      </span>
                      {selectedAlumnus.profile?.academic?.graduationYear && (
                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                          Class of {selectedAlumnus.profile.academic.graduationYear}
                        </span>
                      )}
                      {selectedAlumnus.profile?.professional?.currentCompany && (
                        <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                          {selectedAlumnus.profile.professional.currentCompany}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Department</p>
                        <p className="text-gray-800">{selectedAlumnus.profile?.basicInfo?.department || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="text-gray-800">{selectedAlumnus.profile?.basicInfo?.location || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-800">{selectedAlumnus.profile?.basicInfo?.phone || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Professional Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Current Company</p>
                        <p className="text-gray-800">{selectedAlumnus.profile?.professional?.currentCompany || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Designation</p>
                        <p className="text-gray-800">{selectedAlumnus.profile?.professional?.designation || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Experience</p>
                        <p className="text-gray-800">{selectedAlumnus.profile?.professional?.experience || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Send Message
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;