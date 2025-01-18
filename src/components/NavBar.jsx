import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="navbar flex justify-between items-center">
        <div className="logo flex items-center space-x-2">
          <NavLink className="text-lg font-bold" to="/">
            Home
          </NavLink>
        </div>
        <div className="menu">
          <ul className="flex space-x-4">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-300 font-bold"
                    : "text-white hover:text-yellow-400"
                }
                to="/movies"
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-300 font-bold"
                    : "text-white hover:text-yellow-400"
                }
                to="/tv-shows"
              >
                TV Shows
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className={
                  ({ isActive }) =>
                    isActive
                      ? "text-blue-300 font-bold" // Active link styles
                      : "text-white hover:text-yellow-400" // Regular link styles
                }
                to="/actors"
              >
                Actors
              </NavLink>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}
