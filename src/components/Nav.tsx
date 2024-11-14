import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Nav: React.FC = () => {  // Navigation bar
  return (
    <nav className="nav">
      <ul className="nav-item">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/SavedCandidates" className="nav-link">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
