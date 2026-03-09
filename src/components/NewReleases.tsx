import Movies from "./Movies";

const NewReleases = () => {
  return (
    <div>
      <h2 className="mb-2">📀 New Releases</h2>
      <p className="lead text-muted">
        Check out the latest movies and shows added to our library.
      </p>
      <Movies />
    </div>
  );
};

export default NewReleases;
