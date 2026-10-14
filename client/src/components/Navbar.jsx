/****************************************************************/
/* Provides site-wide navigation. Brings together React Router, */
/* shared components, and individual page components.           */
/****************************************************************/

// NavLink component allows tracking which page is currently active.
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <NavLink to="/">
            <img src="/images/logo.png" alt="JD Technologies logo" />
        </NavLink>
      </div>

      <div>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/education">Education</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}

// Exports so it can be imported and used by other files
export default Navbar;