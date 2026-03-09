import { Routes, Route } from "react-router-dom";
import { useDarkMode } from "./hooks";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import NewReleases from "./components/pages/NewReleases";
import Trending from "./components/pages/Trending";
import TopRated from "./components/pages/TopRated";
import Collections from "./components/pages/Collections";
import Documentaries from "./components/pages/Documentries";
import MyLibrary from "./components/pages/MyLibrary";
import Watchlist from "./components/pages/Watchlist";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

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
