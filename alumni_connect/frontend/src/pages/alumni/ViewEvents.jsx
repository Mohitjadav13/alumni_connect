import React, { useState } from "react";

const ViewEvents = () => {
  const [events] = useState([
    {
      id: 1,
      title: "Annual Alumni Meet 2024",
      date: "2024-03-15",
      venue: "College Auditorium",
      description: "Join us for the annual alumni gathering!",
      interested: false
    },
    {
      id: 2,
      title: "Tech Workshop",
      date: "2024-04-20",
      venue: "Virtual",
      description: "Learn about latest technology trends",
      interested: true
    }
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">Date: {event.date}</p>
                <p className="text-gray-600">Venue: {event.venue}</p>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>
              <button
                className={`px-4 py-2 rounded ${
                  event.interested 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {event.interested ? 'Interested' : 'Show Interest'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEvents;
