interface NavProps {
  activePage: string;
  onSelect: (page: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

function Nav({ activePage, onSelect, darkMode, onToggleDarkMode }: NavProps) {
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

  const handleClick = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(page);
  };

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
                className={`nav-link dropdown-toggle${activePage === item.name ? " active" : ""}`}
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
                      <a
                        className={`dropdown-item${activePage === dropdownItem.name ? " active" : ""}`}
                        href="#"
                        onClick={(e) => handleClick(dropdownItem.name!, e)}
                      >
                        {dropdownItem.name}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </>
          ) : (
            <a
              className={`nav-link${activePage === item.name ? " active" : ""}`}
              href="#"
              onClick={(e) => handleClick(item.name, e)}
              {...(activePage === item.name && { "aria-current": "page" })}
            >
              {item.name}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Nav;
