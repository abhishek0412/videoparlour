interface BreadcrumbProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

// Maps child pages to their parent dropdown
const parentMap: Record<string, string> = {
  "New Releases": "Browse",
  Trending: "Browse",
  "Top Rated": "Browse",
  Collections: "Browse",
  Action: "Categories",
  Comedy: "Categories",
  Drama: "Categories",
  Horror: "Categories",
  "Sci-Fi": "Categories",
  Documentaries: "Categories",
};

const Breadcrumb = ({ activePage, onNavigate }: BreadcrumbProps) => {
  const trail: { name: string; active: boolean }[] = [
    { name: "Home", active: activePage === "Home" },
  ];

  if (activePage !== "Home") {
    const parent = parentMap[activePage];
    if (parent) {
      trail.push({ name: parent, active: false });
    }
    trail.push({ name: activePage, active: true });
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb" style={{ gap: "0.5rem" }}>
        {trail.map((item) => (
          <li className="breadcrumb-item" key={item.name}>
            {item.active ? (
              <span className="badge rounded-pill bg-secondary text-white">
                {item.name}
              </span>
            ) : (
              <a
                href="#"
                className="badge rounded-pill bg-primary text-white text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.name);
                }}
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
