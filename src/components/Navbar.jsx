import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
  <nav className="navbar navbar-custom bg-dark px-4">
      <span className="navbar-brand"><img src="/icon.png" alt="DevTrack AI" style={{ height: '30px', marginRight: '10px', borderRadius:'30px'}} />DevTrack AI</span>

      <div>
        <Link to="/" className="text-white me-3 text-decoration-none">
          Home
        </Link>

        <Link to="/stats" className="text-white text-decoration-none">
          Status
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;