import { useLocation, Link } from "react-router-dom";
import { routes, getPageName, getPath } from "../../utils";

const Breadcrumb = () => {
  const location = useLocation();
  const currentPage = getPageName(location.pathname);

  const trail: { name: string; active: boolean }[] = [
    { name: "Home", active: currentPage === "Home" },
  ];

  if (currentPage !== "Home") {
    const parent = routes[currentPage]?.parent;
    if (parent) {
      trail.push({ name: parent, active: false });
    }
    trail.push({ name: currentPage, active: true });
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
              <Link
                to={getPath(item.name)}
                className="badge rounded-pill bg-primary text-white text-decoration-none"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
