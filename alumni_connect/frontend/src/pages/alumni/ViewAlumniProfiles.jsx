import React, { useState } from "react";

const ViewAlumniProfiles = () => {
  const [alumni] = useState([
    {
      id: 1,
      name: "John Doe",
      department: "Computer Science",
      graduationYear: 2023,
      currentCompany: "Google",
      designation: "Software Engineer",
      skills: ["React", "Node.js", "Python"],
      experience: "2 years",
      achievements: ["Best Graduate Award 2023", "Tech Innovation Prize"],
      linkedin: "linkedin.com/johndoe",
      github: "github.com/johndoe",
      email: "john.doe@gmail.com",
      phone: "+1234567890",
      location: "San Francisco, CA",
      avatar: "https://ui-avatars.com/api/?name=John+Doe"
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Information Technology",
      graduationYear: 2022,
      currentCompany: "Microsoft",
      designation: "Data Analyst",
      skills: ["SQL", "Python", "Power BI"],
      experience: "1 year",
      achievements: ["Employee of the Year 2022"],
      linkedin: "linkedin.com/janesmith",
      github: "github.com/janesmith",
      email: "jane.smith@gmail.com",
      phone: "+9876543210",
      location: "Seattle, WA",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith"
    }
  ]);

  return (
    <div className="page-container">
      <h2 className="page-title">Alumni Network</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {alumni.map((alumnus) => (
          <div key={alumnus.id} className="card hover:scale-105 transition-all duration-300">
            <div className="flex items-start space-x-4 p-6">
              <img 
                src={alumnus.avatar} 
                alt={alumnus.name}
                className="w-24 h-24 rounded-full border-4 border-blue-100"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{alumnus.name}</h3>
                <p className="text-blue-600">{alumnus.designation} at {alumnus.currentCompany}</p>
                <p className="text-gray-600">{alumnus.department} | Batch of {alumnus.graduationYear}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{alumnus.experience} Experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{alumnus.location}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Skills</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {alumnus.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <a href={`https://${alumnus.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM7.65 13.979H5.706V7.723H7.65v6.256zm-.984-7.024c-.614 0-1.011-.435-1.011-.973 0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973zm8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355-.537 0-.856.371-.997.728-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01 1.279 0 2.238.857 2.238 2.699v3.699z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href={`https://${alumnus.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:underline flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAlumniProfiles;
