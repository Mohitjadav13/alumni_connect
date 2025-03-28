import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const FacultyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    basicInfo: {
      name: '',
      email: '',
      phone: '',
      avatar: '',
      department: '',
      designation: '',
      employeeId: ''
    },
    academic: {
      specialization: '',
      qualifications: [],
      subjects: [],
      experience: ''
    },
    research: {
      publications: [],
      projects: [],
      areas: []
    },
    contact: {
      officeLocation: '',
      officeHours: '',
      website: ''
    }
  });

  useEffect(() => {
    if (user?.profile) {
      setProfile(prev => ({...prev, ...user.profile}));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({ profile }),
      });
      
      if (res.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-white">
          <div className="flex items-center space-x-4">
            <img
              src={profile.basicInfo.avatar || `https://ui-avatars.com/api/?name=${profile.basicInfo.name}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold">{profile.basicInfo.name}</h1>
              <p>{profile.basicInfo.designation}, {profile.basicInfo.department}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(profile.basicInfo).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={value}
                        onChange={(e) => setProfile({
                          ...profile,
                          basicInfo: {...profile.basicInfo, [key]: e.target.value}
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Academic Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Academic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(profile.academic).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {isEditing ? (
                      Array.isArray(value) ? (
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={value.join(', ')}
                          onChange={(e) => setProfile({
                            ...profile,
                            academic: {
                              ...profile.academic,
                              [key]: e.target.value.split(',').map(item => item.trim())
                            }
                          })}
                        />
                      ) : (
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={value}
                          onChange={(e) => setProfile({
                            ...profile,
                            academic: {...profile.academic, [key]: e.target.value}
                          })}
                        />
                      )
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Research Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Research & Publications</h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(profile.research).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {isEditing ? (
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={Array.isArray(value) ? value.join('\n') : value}
                        onChange={(e) => setProfile({
                          ...profile,
                          research: {
                            ...profile.research,
                            [key]: Array.isArray(value) ? e.target.value.split('\n') : e.target.value
                          }
                        })}
                        rows={4}
                      />
                    ) : (
                      <div className="mt-1 text-gray-900">
                        {Array.isArray(value) ? (
                          <ul className="list-disc pl-4">
                            {value.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
