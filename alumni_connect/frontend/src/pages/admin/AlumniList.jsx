import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/alumni`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
      });
      const data = await response.json();
      setAlumni(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to remove this alumni?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/remove-alumni/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        });

        if (response.ok) {
          await fetchAlumni();
          alert('Alumni removed successfully');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to remove alumni');
      }
    }
  };

  const filteredAlumni = alumni.filter(a => 
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.profile?.basicInfo?.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Alumni Directory</h2>
            <p className="text-gray-600 mt-1">
              {alumni.length} {alumni.length === 1 ? 'alumnus' : 'alumni'} registered
            </p>
          </div>
          <Link 
            to="/admin/add-alumni"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full md:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Alumni
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, email or department..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlumni.map((alumnus) => (
              <div key={alumnus._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={alumnus.profile?.basicInfo?.avatar || `https://ui-avatars.com/api/?name=${alumnus.name}&background=random`}
                      alt={alumnus.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 truncate">{alumnus.name}</h3>
                      <p className="text-sm text-blue-600 truncate">{alumnus.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department</p>
                      <p className="text-gray-800">{alumnus.profile?.basicInfo?.department || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Graduation Year</p>
                      <p className="text-gray-800">{alumnus.profile?.academic?.graduationYear || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
                  <button
                    onClick={() => handleRemove(alumnus._id)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No matching alumni found' : 'No alumni registered yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search query' : 'Add new alumni to get started'}
            </p>
            <Link 
              to="/admin/add-alumni"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Add Alumni
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniList;