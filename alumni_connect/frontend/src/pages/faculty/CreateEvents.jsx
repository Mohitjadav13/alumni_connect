import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CreateEvents = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    venue: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({
          ...eventData,
          createdBy: user._id
        }),
      });
      
      if (res.ok) {
        alert('Event created successfully!');
        setEventData({ title: '', description: '', date: '', venue: '' });
        navigate('/faculty');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Create New Event</h2>
            <p className="mt-2 text-sm text-gray-600">Fill out the form below to create a new event</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input
                id="title"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={eventData.title}
                onChange={(e) => setEventData({...eventData, title: e.target.value})}
                placeholder="Enter event title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                rows="5"
                value={eventData.description}
                onChange={(e) => setEventData({...eventData, description: e.target.value})}
                placeholder="Enter event description"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input
                  id="date"
                  type="datetime-local"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={eventData.date}
                  onChange={(e) => setEventData({...eventData, date: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <input
                  id="venue"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={eventData.venue}
                  onChange={(e) => setEventData({...eventData, venue: e.target.value})}
                  placeholder="Enter venue location"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;