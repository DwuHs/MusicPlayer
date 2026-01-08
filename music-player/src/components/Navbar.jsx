import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          Music Player
        </Link>
      </div>
      <div className="navbar-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          All Songs
        </Link>
        <Link
          to="/playlists"
          className={`nav-link ${
            location.pathname === "/playlists" ? "active" : ""
          }`}
        >
          Playlists
        </Link>
      </div>
    </nav>
  );
};
