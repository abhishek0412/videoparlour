import Home from "./Home";
import NewReleases from "./NewReleases";
import Trending from "./Trending";
import TopRated from "./TopRated";
import Collections from "./Collections";
import Documentaries from "./Documentries";
import MyLibrary from "./MyLibrary";
import Watchlist from "./Watchlist";
import About from "./About";
import Breadcrumb from "./Breadcrumb";

interface ContainerProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const pages: Record<
  string,
  React.ComponentType<{ onNavigate?: (page: string) => void }>
> = {
  Home,
  "New Releases": NewReleases,
  Trending,
  "Top Rated": TopRated,
  Collections,
  Documentaries,
  "My Library": MyLibrary,
  Watchlist,
  About,
};

const Container = ({ activePage, onNavigate }: ContainerProps) => {
  const PageComponent = pages[activePage];

  return (
    <div className="container p-4">
      <Breadcrumb activePage={activePage} onNavigate={onNavigate} />
      {PageComponent ? (
        <PageComponent onNavigate={onNavigate} />
      ) : (
        <div>
          <h2>{activePage}</h2>
          <p className="lead text-muted">This page is coming soon.</p>
        </div>
      )}
    </div>
  );
};

export default Container;
