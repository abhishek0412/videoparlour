import { NavLink } from "react-router-dom";
import { getPath } from "../routes";

interface NavProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

function Nav({ darkMode, onToggleDarkMode }: NavProps) {
  const navItems = [
    { name: "Home" },
    {
      name: "Browse",
      dropdown: [
        { name: "New Releases" },
        { name: "Trending" },
        { name: "Top Rated" },
        { divider: true },
        { name: "Collections" },
      ],
    },
    {
      name: "Categories",
      dropdown: [
        { name: "Action" },
        { name: "Comedy" },
        { name: "Drama" },
        { name: "Horror" },
        { name: "Sci-Fi" },
        { divider: true },
        { name: "Documentaries" },
      ],
    },
    { name: "My Library" },
    { name: "Watchlist" },
    { name: "About" },
  ];

  return (
    <ul
      className="nav nav-pills flex-column bg-body-tertiary p-3 border-end"
      style={{ minHeight: "100vh", minWidth: "200px" }}
    >
      <li className="nav-item mb-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={onToggleDarkMode}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </label>
        </div>
      </li>
      <hr className="border-secondary" />
      {navItems.map((item) => (
        <li
          className={`nav-item${item.dropdown ? " dropdown" : ""}`}
          key={item.name}
        >
          {item.dropdown ? (
            <>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                {item.name}
              </a>
              <ul className="dropdown-menu">
                {item.dropdown.map((dropdownItem, index) =>
                  dropdownItem.divider ? (
                    <li key={`divider-${index}`}>
                      <hr className="dropdown-divider" />
                    </li>
                  ) : (
                    <li key={dropdownItem.name}>
                      <NavLink
                        className={({ isActive }) =>
                          `dropdown-item${isActive ? " active" : ""}`
                        }
                        to={getPath(dropdownItem.name!)}
                      >
                        {dropdownItem.name}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              to={getPath(item.name)}
              end={item.name === "Home"}
            >
              {item.name}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Nav;
