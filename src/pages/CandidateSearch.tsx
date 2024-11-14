import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [userDetails, setUserDetails] = useState<Candidate | null>(null);

  useEffect(() => {  // Fetch candidates and saved candidates from local storage
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        setCandidates(data);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      }
    };

    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }

    fetchCandidates();
  }, []);

  useEffect(() => {  
    // Automatically fetch user details when current candidate changes
    if (candidates[currentIndex]) {
      handleUserDetails(candidates[currentIndex].login);
    }
  }, [currentIndex, candidates]); // Dependency on currentIndex and candidates array

  const handleMinus = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
  };

  const handlePlus = async () => {  // Save candidate to local storage
    const candidateToSave = candidates[currentIndex];
    try {
      const detailedCandidate = await searchGithubUser(candidateToSave.login);
      const updatedSavedCandidates = [...savedCandidates, detailedCandidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    } catch (error) {
      console.error("Error fetching detailed candidate info:", error);
    }
  
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
  };
  

  const handleUserDetails = async (username: string) => {  // Fetch user details from GitHub API
    try {
      const details = await searchGithubUser(username);
      console.log('Fetched user details:', details);
      setUserDetails(details);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  if (candidates.length === 0) return <div>Loading...</div>;

  const currentCandidate = candidates[currentIndex];

  return (  // Display candidate details and actions
    <div>
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img src={currentCandidate.avatar_url} alt="Avatar" width="300" /> 
        <h2 onClick={() => handleUserDetails(currentCandidate.login)}>
          {currentCandidate.login}
        </h2>
        {/* <p>Location: {currentCandidate.location || 'N/A'}</p>
        <p>Email: {currentCandidate.email || 'N/A'}</p>
        <p>Company: {currentCandidate.company || 'N/A'}</p> */}

        {userDetails && (  // Display user details if available
          <div className="user-details">
            <p>Email: {userDetails.email || 'N/A'}</p>
            <p>Company: {userDetails.company || 'N/A'}</p>
            <p>Location: {userDetails.location || 'N/A'}</p>
            <p>Bio: {userDetails.bio || 'N/A'}</p>
          </div>
        )}
        </div>

        <div className="actions">  {/* Action buttons */}
          <button className='red' onClick={handleMinus}>-</button>  
          <button className='green' onClick={handlePlus}>+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
