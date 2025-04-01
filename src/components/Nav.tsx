import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md py-4 px-8">
      <nav className="max-w-7xl mx-auto flex justify-end gap-8 text-sm font-medium">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'underline'
              : 'hover:underline hover:text-gray-100 transition'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/SavedCandidates"
          className={({ isActive }) =>
            isActive
              ? 'underline'
              : 'hover:underline hover:text-gray-100 transition'
          }
        >
          Saved Candidates
        </NavLink>
      </nav>
    </header>
  );
};

export default Nav;
