import { useState, useEffect, useCallback } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Container from "./components/Container";

function App() {
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash ? decodeURIComponent(hash) : "Home";
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  const navigate = useCallback((page: string) => {
    setActivePage(page);
    window.history.pushState({ page }, "", `#${encodeURIComponent(page)}`);
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || "Home";
      setActivePage(page);
    };

    window.addEventListener("popstate", handlePopState);

    // Set initial history state
    window.history.replaceState(
      { page: activePage },
      "",
      `#${encodeURIComponent(activePage)}`,
    );

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="d-flex">
      <Nav
        activePage={activePage}
        onSelect={navigate}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <div className="flex-grow-1 d-flex flex-column">
        <div className="flex-grow-1">
          <Container activePage={activePage} onNavigate={navigate} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
