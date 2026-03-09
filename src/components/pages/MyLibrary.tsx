import Movies from '../common/Movies';

const MyLibrary = () => {
  return (
    <div>
      <h2 className="mb-2">📖 My Library</h2>
      <p className="lead text-muted">
        Your purchased and rented movies and shows.
      </p>
      <Movies />
    </div>
  );
};

export default MyLibrary;
