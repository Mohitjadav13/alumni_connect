import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/alumni`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch alumni');
      }

      const data = await res.json();
      setAlumni(data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
      alert('Error loading alumni data');
    }
  };

  const handleBack = () => {
    navigate('/faculty');
  };

  const filteredAlumni = alumni.filter(alumnus => 
    alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.profile?.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Alumni Directory</h2>
            <p className="mt-2 text-sm text-gray-600">Browse and connect with alumni</p>
          </div>
          <button
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow transition duration-200 transform hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or department..."
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumnus) => (
              <div 
                key={alumnus._id} 
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={alumnus.profile?.basicInfo?.avatar || `https://ui-avatars.com/api/?name=${alumnus.name}&background=random`}
                      alt={alumnus.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{alumnus.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {alumnus.profile?.professional?.designation || 'Not specified'}
                        {alumnus.profile?.professional?.currentCompany && 
                          ` at ${alumnus.profile.professional.currentCompany}`}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Academic Info */}
                    <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-1 text-sm">Academic Information</h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-[120px]">Department:</span>
                          <span>{alumnus.profile?.basicInfo?.department || 'Not specified'}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-[120px]">Graduation Year:</span>
                          <span>{alumnus.profile?.academic?.graduationYear || 'Not specified'}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-[120px]">Degree:</span>
                          <span>{alumnus.profile?.academic?.degree || 'Not specified'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Professional Info */}
                    <div className="bg-green-50/50 p-3 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-green-800 mb-1 text-sm">Professional Information</h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-[120px]">Experience:</span>
                          <span>{alumnus.profile?.professional?.experience || 'Not specified'}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-[120px]">Skills:</span>
                          <span>{alumnus.profile?.professional?.skills?.join(', ') || 'Not specified'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-800 mb-1 text-sm">Contact Information</h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-[120px]">Email:</span>
                          <span className="break-all">{alumnus.email}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-[120px]">Phone:</span>
                          <span>{alumnus.profile?.basicInfo?.phone || 'Not specified'}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 min-w-[120px]">Location:</span>
                          <span>{alumnus.profile?.basicInfo?.location || 'Not specified'}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  {(alumnus.profile?.social?.linkedin || alumnus.profile?.social?.github) && (
                    <div className="flex space-x-4 mt-4 pt-3 border-t border-gray-100">
                      {alumnus.profile?.social?.linkedin && (
                        <a 
                          href={alumnus.profile.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {alumnus.profile?.social?.github && (
                        <a 
                          href={alumnus.profile.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800 flex items-center text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">No alumni found</h3>
            <p className="mt-2 text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAlumni;