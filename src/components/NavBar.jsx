import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </div>
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/tv-shows" className={({ isActive }) => (isActive ? "active" : "")}>
                TV Shows
              </NavLink>
            </li>
            <li>
              <NavLink to="/actors" className={({ isActive }) => (isActive ? "active" : "")}>
                Actors
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
