import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ViewAlumniProfiles = () => {
  const { user } = useContext(AuthContext);
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/alumni`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      const data = await response.json();
      setAlumni(data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlumni = alumni.filter(a =>
    a._id !== user?._id &&
    (
      a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.profile?.basicInfo?.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.profile?.academic?.graduationYear?.toString().includes(searchTerm) ||
      a.profile?.professional?.currentCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.profile?.professional?.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.profile?.professional?.skills?.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleViewProfile = (alumnus) => {
    setSelectedAlumnus(alumnus);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Alumni Network</h2>
          <p className="mt-2 text-gray-600">Connect with fellow graduates from your institution</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, department, company, skills..."
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumnus) => (
              <div 
                key={alumnus._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleViewProfile(alumnus)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={alumnus.profile?.basicInfo?.avatar || `https://ui-avatars.com/api/?name=${alumnus.name}&background=random`} 
                      alt={alumnus.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{alumnus.name}</h3>
                      <p className="text-blue-600 text-sm">
                        {alumnus.profile?.professional?.designation || 'Alumni'}
                        {alumnus.profile?.professional?.currentCompany && 
                          ` at ${alumnus.profile.professional.currentCompany}`}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Department:</span> {alumnus.profile?.basicInfo?.department || 'Not specified'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Batch:</span> {alumnus.profile?.academic?.graduationYear || 'Not specified'}
                    </p>
                  </div>

                  {/* Skills */}
                  {alumnus.profile?.professional?.skills?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {alumnus.profile.professional.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                        {alumnus.profile.professional.skills.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{alumnus.profile.professional.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-3">
                    {alumnus.profile?.social?.linkedin && (
                      <a 
                        href={alumnus.profile.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {alumnus.profile?.social?.github && (
                      <a 
                        href={alumnus.profile.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 4.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                        </svg>
                      </a>
                    )}
                  </div>
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
                      src={selectedAlumnus.profile?.basicInfo?.avatar || `https://ui-avatars.com/api/?name=${selectedAlumnus.name}&background=random`}
                      alt={selectedAlumnus.name}
                      className="w-24 h-24 rounded-full border-4 border-blue-100 shadow"
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

export default ViewAlumniProfiles;