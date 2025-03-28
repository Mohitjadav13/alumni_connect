import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    collegeEmail: '',
    personalEmail: '',
    mobile: '',
    graduationYear: '',
    department: '',
    currentCompany: '',
    designation: '',
    linkedin: ''
  });

  useEffect(() => {
    if (user?.profile) {
      setProfile(user.profile);
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
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">College Email</label>
            <input
              type="email"
              className="mt-1 w-full p-2 border rounded"
              value={profile.collegeEmail}
              onChange={(e) => setProfile({...profile, collegeEmail: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Personal Email</label>
            <input
              type="email"
              className="mt-1 w-full p-2 border rounded"
              value={profile.personalEmail}
              onChange={(e) => setProfile({...profile, personalEmail: e.target.value})}
            />
          </div>
          {/* Add other profile fields similarly */}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
