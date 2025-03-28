import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    venue: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        
        const data = await response.json();
        if (data) {
          setEventData({
            title: data.title,
            description: data.description,
            venue: data.venue,
            date: new Date(data.date).toISOString().slice(0, 16)
          });
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        alert('Error fetching event details');
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert('Event updated successfully!');
        navigate('/faculty');
      } else {
        throw new Error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Edit Event</h2>
            <p className="mt-2 text-sm text-gray-600">Update the event details below</p>
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
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Event
              </button>
              <button
                type="button"
                onClick={() => navigate('/faculty')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;