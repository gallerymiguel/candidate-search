import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // To store the list of candidates
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current candidate
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]); // To store saved candidates
  const [userDetails, setUserDetails] = useState<any>(null); // To store the detailed user info
  

  useEffect(() => {
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

  const handleMinus = () => {
    // Skip to the next candidate
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
  };

  const handlePlus = () => {
    // Save the current candidate and move to the next one
    const candidateToSave = candidates[currentIndex];
    setSavedCandidates((prev) => [...prev, candidateToSave]);
    localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidateToSave]));

    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
  };

  const handleUserDetails = async (username: string) => {
    try {
      const details = await searchGithubUser(username);
      console.log('User details response:', details);  // Log the raw response
      setUserDetails(details); // Update state with the detailed user info
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  

  if (candidates.length === 0) return <div>Loading...</div>;

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img src={currentCandidate.avatar_url} alt="Avatar" width= '300' />
        <h2 onClick={() => handleUserDetails(currentCandidate.login)}>{currentCandidate.login}</h2> {/* GitHub username */}
        <p>Location: {currentCandidate.location || 'N/A'}</p>
        <p>Email: {currentCandidate.email || 'N/A'}</p>
        <p>Company: {currentCandidate.company || 'N/A'}</p>

        <div className="actions">
          <button onClick={handleMinus}>-</button>
          <button onClick={handlePlus}>+</button>
        </div>

        {/* If user details are available, display them */}
        {userDetails && (
          <div className="user-details">
            <h3>{userDetails.name}</h3>
            <p>Bio: {userDetails.bio}</p>
            <p>Followers: {userDetails.followers}</p>
            <p>Following: {userDetails.following}</p>
            <p>Location: {userDetails.location}</p>
            {/* Add more details as necessary */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSearch;
