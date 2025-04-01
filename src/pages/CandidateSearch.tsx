import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import { FaGithub } from "react-icons/fa";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [userDetails, setUserDetails] = useState<Candidate | null>(null);

  // Load initial data on mount
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const data = await searchGithub();
        setCandidates(data);
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
      }
    };

    const stored = localStorage.getItem("savedCandidates");
    if (stored) {
      setSavedCandidates(JSON.parse(stored));
    }

    loadCandidates();
  }, []);

  // Load user details whenever the current candidate changes
  useEffect(() => {
    if (candidates[currentIndex]) {
      fetchUserDetails(candidates[currentIndex].login);
    }
  }, [currentIndex, candidates]);

  const fetchUserDetails = async (username: string) => {
    try {
      const details = await searchGithubUser(username);
      setUserDetails(details);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % candidates.length);
  };

  const handleSave = async () => {
    const candidate = candidates[currentIndex];
    try {
      const detailedCandidate = await searchGithubUser(candidate.login);
      const updated = [...savedCandidates, detailedCandidate];
      setSavedCandidates(updated);
      localStorage.setItem("savedCandidates", JSON.stringify(updated));
    } catch (err) {
      console.error("Error saving candidate:", err);
    }

    handleNext();
  };

  if (candidates.length === 0) return <div>Loading...</div>;

  const current = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      <div
        key={current.login}
        className="animate-fadeUp bg-white rounded-xl shadow-md p-6 max-w-md w-full mx-auto mt-8 flex flex-col items-center text-center animate-fade"
      >
        <img
          src={current.avatar_url}
          alt={`${current.login}'s avatar`}
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mb-4"
        />

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          <a
            href={`https://github.com/${current.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-blue-600 hover:underline"
          >
            <FaGithub className="text-lg" />
            {current.login}
          </a>
        </h2>

        {userDetails && (
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Email:</strong> {userDetails.email || "N/A"}
            </p>
            <p>
              <strong>Company:</strong> {userDetails.company || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {userDetails.location || "N/A"}
            </p>
            <p>
              <strong>Bio:</strong> {userDetails.bio || "N/A"}
            </p>
          </div>
        )}
      </div>

      <div className="actions">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          onClick={handleNext}
        >
          ❌ Skip
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
          onClick={handleSave}
        >
          ✅ Save
        </button>
      </div>
    </div>
  );
};

export default CandidateSearch;
