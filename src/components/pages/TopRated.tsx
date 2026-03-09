import Movies from "../common/Movies";

const TopRated = () => {
  return (
    <div>
      <h2 className="mb-2">⭐ Top Rated</h2>
      <p className="lead text-muted">
        The highest rated movies and shows by our community.
      </p>
      <Movies />
    </div>
  );
};

export default TopRated;
