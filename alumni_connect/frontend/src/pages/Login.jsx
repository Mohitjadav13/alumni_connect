import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      let endpoint = `${import.meta.env.VITE_API_URL}/users/login`;
      let body = { email, password };
      
      // If it's admin login, use admin endpoint
      if (email === 'admin@example.com') {
        endpoint = `${import.meta.env.VITE_API_URL}/admin/login`;
        body = { email, password, username: email };
      }
      
      console.log('Attempting login with:', { endpoint, email });
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          token: data.token
        });
        
        localStorage.setItem('userToken', data.token);
        
        // Redirect based on role
        const redirectPath = data.role === 'admin' ? '/admin' : `/${data.role}`;
        navigate(redirectPath);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Alumni Connect</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-center">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
