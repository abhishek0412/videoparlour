import { useFetch } from '../../hooks';
import { API_ENDPOINTS } from '../../constants';
import type { Book } from '../../types';
import Movie from './Movie';

const Movies = () => {
  const {
    data: movies,
    loading,
    error,
  } = useFetch<Book[]>(API_ENDPOINTS.BOOKS);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="row">
      {(movies ?? []).map((movie) => (
        <Movie
          key={movie.index}
          number={movie.number}
          title={movie.title}
          releaseDate={movie.releaseDate}
          description={movie.description}
          pages={movie.pages}
          cover={movie.cover}
        />
      ))}
    </div>
  );
};

export default Movies;
