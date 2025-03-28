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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Title</label>
          <input
            type="text"
            required
            className="mt-1 w-full p-2 border rounded"
            value={eventData.title}
            onChange={(e) => setEventData({...eventData, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            className="mt-1 w-full p-2 border rounded"
            rows="4"
            value={eventData.description}
            onChange={(e) => setEventData({...eventData, description: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="datetime-local"
            required
            className="mt-1 w-full p-2 border rounded"
            value={eventData.date}
            onChange={(e) => setEventData({...eventData, date: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Venue</label>
          <input
            type="text"
            required
            className="mt-1 w-full p-2 border rounded"
            value={eventData.venue}
            onChange={(e) => setEventData({...eventData, venue: e.target.value})}
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update Event
          </button>
          <button
            type="button"
            onClick={() => navigate('/faculty')}
            className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
