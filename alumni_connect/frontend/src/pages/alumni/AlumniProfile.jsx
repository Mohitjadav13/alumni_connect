import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileEditor from "../../components/ProfileEditor";

const AlumniProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    basicInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      graduationYear: '',
      department: '',
    },
    professional: {
      currentCompany: '',
      designation: '',
      experience: '',
      skills: [],
      achievements: [],
    },
    social: {
      linkedin: '',
      github: '',
      portfolio: '',
    },
    education: {
      degree: '',
      major: '',
      cgpa: '',
      activities: '',
    }
  });

  useEffect(() => {
    fetchProfile();
  }, [user?._id]);

  const fetchProfile = async () => {
    if (!user?._id) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      const data = await res.json();
      if (data.profile) {
        setProfile(prev => ({...prev, ...data.profile}));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={profile.basicInfo.avatar || 
                     `https://ui-avatars.com/api/?name=${getInitials(profile.basicInfo.name || 'User')}&background=random&color=fff&size=200&font-size=0.5`}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{profile.basicInfo.name}</h1>
                <p>{profile.professional.designation} at {profile.professional.currentCompany}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="p-6">
          <ProfileEditor
            profile={profile}
            isEditing={isEditing}
            onProfileChange={setProfile}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;
