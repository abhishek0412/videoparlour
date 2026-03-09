import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NewReleases from "./components/NewReleases";
import Trending from "./components/Trending";
import TopRated from "./components/TopRated";
import Collections from "./components/Collections";
import Documentaries from "./components/Documentries";
import MyLibrary from "./components/MyLibrary";
import Watchlist from "./components/Watchlist";
import About from "./components/About";
import NotFound from "./components/NotFound";

function App() {
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

  return (
    <Routes>
      <Route
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        }
      >
        <Route index element={<Home />} />
        <Route path="new-releases" element={<NewReleases />} />
        <Route path="trending" element={<Trending />} />
        <Route path="top-rated" element={<TopRated />} />
        <Route path="collections" element={<Collections />} />
        <Route path="documentaries" element={<Documentaries />} />
        <Route path="my-library" element={<MyLibrary />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
