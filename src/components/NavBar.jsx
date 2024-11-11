import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/">
            Home
          </NavLink>
        </div>
        <div className="menu">
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/movies" >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/tv-shows">
                TV Shows
              </NavLink>
            </li>
            <li>
              <NavLink to="/actors">
                Actors
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
