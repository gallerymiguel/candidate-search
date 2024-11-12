import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]); // Store saved candidates

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved)); // Get saved candidates from localStorage
    }
  }, []); // Runs once when the component is mounted

  const handleRemove = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index); // Remove candidate at the given index
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates)); // Update localStorage
  };

  if (savedCandidates.length === 0) {
    return <div>No saved candidates yet!</div>;
  }

  return (
    <div>
      <h1>Saved Candidates</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={candidate.login}>
                <td><img src={candidate.avatar_url} alt="Avatar" width="50" /></td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'No bio provided'}</td>
                <td>
                  <button onClick={() => handleRemove(index)}>-</button>  {/* Reject button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedCandidates;
