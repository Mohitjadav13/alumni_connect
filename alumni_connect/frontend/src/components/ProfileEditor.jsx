import React, { useState, useRef } from 'react';

const ProfileEditor = ({ profile, isEditing, onProfileChange, onSubmit }) => {
  const [newItem, setNewItem] = useState({ skill: '', achievement: '' });
  const [error, setError] = useState({ skill: '', achievement: '' });
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('basicInfo', 'avatar', reader.result);
      };
      reader.readAsDataURL(file);
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

  const renderProfileImage = () => {
    const defaultImage = `https://ui-avatars.com/api/?name=${getInitials(profile.basicInfo.name || 'User')}&background=random&color=fff&size=200&font-size=0.5`;
    
    return (
      <div className="relative group">
        <img
          src={profile.basicInfo.avatar || defaultImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
        {isEditing && (
          <>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="absolute inset-0 bg-black bg-opacity-50 rounded-full 
                       flex items-center justify-center text-white opacity-0 
                       group-hover:opacity-100 cursor-pointer transition-opacity"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </>
        )}
      </div>
    );
  };

  const handleChange = (section, field, value) => {
    onProfileChange({
      ...profile,
      [section]: {
        ...profile[section],
        [field]: value
      }
    });
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.length > 0 
        ? value.map((item, i) => (
            <span key={i} className="inline-block bg-gray-100 rounded px-2 py-1 text-sm mr-2 mb-2">
              {item}
            </span>
          ))
        : <span className="text-gray-500 italic">Not specified</span>;
    }
    return value || <span className="text-gray-500 italic">Not specified</span>;
  };

  const handleArrayItemAdd = (section, field) => {
    if (!newItem[field]) return;
    
    const value = newItem[field].trim();
    const currentItems = profile[section][field] || [];
    
    // Check for duplicates (case insensitive)
    if (currentItems.some(item => item.toLowerCase() === value.toLowerCase())) {
      setError(prev => ({ 
        ...prev, 
        [field]: `This ${field} already exists` 
      }));
      return;
    }

    setError(prev => ({ ...prev, [field]: '' }));
    const updatedValue = [...currentItems, value];
    
    handleChange(section, field, updatedValue);
    setNewItem(prev => ({ ...prev, [field]: '' }));
  };

  const handleArrayItemRemove = (section, field, index) => {
    const updatedValue = profile[section][field].filter((_, i) => i !== index);
    handleChange(section, field, updatedValue);
  };

  const renderArrayField = (section, field, value) => {
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    
    return (
      <div key={`${section}-${field}`} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        {isEditing ? (
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  className={`flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    error[field] ? 'border-red-500' : ''
                  }`}
                  value={newItem[field]}
                  onChange={(e) => {
                    setNewItem(prev => ({ ...prev, [field]: e.target.value }));
                    setError(prev => ({ ...prev, [field]: '' }));
                  }}
                  placeholder={`Add new ${field}`}
                />
                <button
                  type="button"
                  onClick={() => handleArrayItemAdd(section, field)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Add
                </button>
              </div>
              {error[field] && (
                <p className="text-red-500 text-sm">{error[field]}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {value.map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleArrayItemRemove(section, field, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {value.length > 0 ? (
              value.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 rounded-full px-3 py-1 text-sm"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-500 italic">No {field} added yet</span>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderField = (section, field, value, type = "text") => {
    if (field === 'skills' || field === 'achievements') {
      return renderArrayField(section, field, value);
    }

    const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
    
    return (
      <div key={`${section}-${field}`} className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {isEditing ? (
          Array.isArray(value) ? (
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={value.join(', ')}
              onChange={(e) => handleChange(section, field, e.target.value.split(',').map(item => item.trim()))}
              placeholder={`Enter ${label.toLowerCase()} separated by commas`}
            />
          ) : (
            <input
              type={type}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={value || ''}
              onChange={(e) => handleChange(section, field, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          )
        ) : (
          <div className="mt-1">
            {formatValue(value)}
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-col items-center mb-8">
        {renderProfileImage()}
        {isEditing && (
          <p className="text-sm text-gray-500 mt-2">
            Click the image to change profile photo
          </p>
        )}
      </div>
      
      {Object.entries(profile).map(([section, fields]) => {
        // Skip rendering avatar in the grid since we show it above
        const fieldsToRender = section === 'basicInfo' 
          ? Object.entries(fields).filter(([field]) => field !== 'avatar')
          : Object.entries(fields);

        return (
          <section key={section} className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fieldsToRender.map(([field, value]) => renderField(section, field, value))}
            </div>
          </section>
        );
      })}
      
      {isEditing && (
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileEditor;
