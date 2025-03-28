import React, { useState, useEffect } from "react";

const ViewAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/alumni`);
      const data = await res.json();
      setAlumni(data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  const filteredAlumni = alumni.filter(alumnus => 
    alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.profile?.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">View Alumni</h2>
      <input
        type="text"
        placeholder="Search by name or department..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlumni.map((alumnus) => (
          <div key={alumnus._id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{alumnus.name}</h3>
            <div className="mt-2 space-y-1">
              <p><span className="font-semibold">Email:</span> {alumnus.email}</p>
              <p><span className="font-semibold">Department:</span> {alumnus.profile?.department}</p>
              <p><span className="font-semibold">Graduation Year:</span> {alumnus.profile?.graduationYear}</p>
              <p><span className="font-semibold">Company:</span> {alumnus.profile?.currentCompany}</p>
              <p><span className="font-semibold">Mobile:</span> {alumnus.profile?.mobile}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViewEventDetails = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{event.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{event.date}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-600">Venue</p>
              <p className="font-semibold">{event.venue}</p>
            </div>
          </div>
          <p className="text-gray-600">{event.description}</p>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Interested Alumni ({event.interestedAlumni?.length || 0})</h4>
          <div className="max-h-60 overflow-y-auto">
            {event.interestedAlumni?.map((alumnus) => (
              <div key={alumnus.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <img src={alumnus.avatar} alt={alumnus.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">{alumnus.name}</p>
                  <p className="text-sm text-gray-600">{alumnus.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAlumni;
