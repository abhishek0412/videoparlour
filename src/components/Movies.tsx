import { useState, useEffect } from "react";
import Movie from "./Movie";

interface MovieData {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
}

const Movies = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://potterapi-fedeperin.vercel.app/en/books")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch movies");
        return response.json();
      })
      .then((data: MovieData[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
      {movies.map((movie) => (
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
