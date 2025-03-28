import React, { useState } from "react";

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([
    { id: 1, name: "Dr. Smith", department: "Computer Science", email: "smith@college.edu" },
    { id: 2, name: "Prof. Johnson", department: "Information Technology", email: "johnson@college.edu" }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/add-faculty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({
          ...formData,
          password: 'defaultPassword123' // You might want to generate this randomly
        }),
      });

      if (res.ok) {
        fetchFaculty();
        alert('Faculty added successfully! Login credentials sent via email.');
        setFormData({
          name: '',
          email: '',
          department: ''
        });
      }
    } catch (error) {
      console.error('Error creating faculty:', error);
      alert('Error adding faculty');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Faculty</h2>

      {/* Add Faculty Form */}
      <form onSubmit={handleSubmit} className="max-w-lg mb-8 space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Department"
          className="w-full p-2 border rounded"
          value={formData.department}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Add Faculty
        </button>
      </form>

      {/* Faculty List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faculty.map((f) => (
          <div key={f.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{f.name}</h3>
            <p className="text-gray-600">{f.department}</p>
            <p className="text-gray-600">{f.email}</p>
            <div className="mt-4 space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFaculty;
