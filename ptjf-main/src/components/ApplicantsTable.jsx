import React from 'react';
import '../styles/ApplicantsTable.css'; // Import your CSS file

const ApplicantsTable = () => {
  const applicants = [
    {
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      qualification: "Bachelor's Degree in Computer Science",
      cv: 'alice_cv.pdf',
      appliedOn: '2023-10-26',
    },
    {
      name: 'Bob Smith',
      email: 'bob.s@example.com',
      qualification: "Master's Degree in Business Administration",
      cv: 'bob_cv.docx',
      appliedOn: '2023-10-27',
    },
    {
      name: 'Charlie Brown',
      email: 'charlie.b@example.com',
      qualification: 'High School Diploma',
      cv: 'charlie_cv.pdf',
      appliedOn: '2023-10-28',
    },
    // Add more applicants here...
  ];

  const viewCV = (cvPath) => {
    window.open(cvPath, '_blank');
  };

  return (
    <div className="container">
      <h2>Job Applicants</h2>
      <div className="applicants-list">
        <table className="applicants-table">
          <thead>
            <tr>
              <th>Studentid</th>
              
             
              <th>Actions</th>
              <th>Hire</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={index}>
                <td>{applicant.studentid}</td>
             
                <td>
                  <button className="view-cv" onClick={() => viewCV(applicant.cv)}>
                    View CV
                  </button>
                  <button className="view-details">View Details</button>
                </td>
                <td>
                  <button className="hire-button">Hire</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsTable;