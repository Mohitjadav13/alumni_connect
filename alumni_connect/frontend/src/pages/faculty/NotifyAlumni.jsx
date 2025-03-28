import React, { useState } from "react";

const NotifyAlumni = () => {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    eventId: ''
  });

  const [events] = useState([
    { id: 1, title: "Annual Alumni Meet 2024" },
    { id: 2, title: "Tech Workshop" }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Notification sent:', notification);
    alert('Notification sent successfully!');
    setNotification({ title: '', message: '', eventId: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Notify Alumni</h2>
            <p className="mt-2 text-sm text-gray-600">Send notifications to alumni about upcoming events</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="eventId" className="block text-sm font-medium text-gray-700 mb-1">Select Event</label>
              <select
                id="eventId"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none bg-white"
                value={notification.eventId}
                onChange={(e) => setNotification({...notification, eventId: e.target.value})}
                required
              >
                <option value="">Select an event</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.title}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Notification Title</label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={notification.title}
                onChange={(e) => setNotification({...notification, title: e.target.value})}
                required
                placeholder="Enter notification title"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                rows="5"
                value={notification.message}
                onChange={(e) => setNotification({...notification, message: e.target.value})}
                required
                placeholder="Enter your notification message"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotifyAlumni;