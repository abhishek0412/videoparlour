import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../constants";
import { getPath } from "../../utils";
import type { Book, Spell, House } from "../../types";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(API_ENDPOINTS.BOOKS).then((r) => r.json()),
      fetch(API_ENDPOINTS.SPELLS).then((r) => r.json()),
      fetch(API_ENDPOINTS.HOUSES).then((r) => r.json()),
    ])
      .then(([booksData, spellsData, housesData]) => {
        setBooks(booksData);
        setSpells(spellsData);
        setHouses(housesData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-body-tertiary rounded p-5 mb-4 text-center border">
        <h1 className="display-4 fw-bold">🎬 Welcome to VideoParlour</h1>
        <p className="lead">
          Your one-stop destination for movies, spells, and the wizarding world.
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate(getPath("Collections"))}
        >
          🔍 Search Characters
        </button>
      </div>

      {/* New Releases - Books Preview */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>📚 New Releases</h3>
          <Link to={getPath("New Releases")} className="text-decoration-none">
            View All →
          </Link>
        </div>
        <div className="row">
          {books.slice(0, 4).map((book) => (
            <div className="col-6 col-md-3 mb-3" key={book.index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={book.cover}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body p-2">
                  <small className="fw-bold">{book.title}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Spells Preview */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>✨ Trending Spells</h3>
          <Link to={getPath("Trending")} className="text-decoration-none">
            View All →
          </Link>
        </div>
        <div className="row">
          {spells.slice(0, 6).map((spell) => (
            <div className="col-6 col-md-4 col-lg-2 mb-3" key={spell.index}>
              <div className="card text-center h-100 shadow-sm border-0 bg-body-tertiary">
                <div className="card-body p-2">
                  <h6 className="card-title mb-1">{spell.spell}</h6>
                  <small className="text-body-secondary">{spell.use}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hogwarts Houses Preview */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>🏠 Hogwarts Houses</h3>
          <Link to={getPath("Documentaries")} className="text-decoration-none">
            View All →
          </Link>
        </div>
        <div className="row">
          {houses.map((house) => (
            <div className="col-6 col-md-3 mb-3" key={house.index}>
              <div
                className="card text-center h-100 shadow-sm"
                style={{ borderTop: `4px solid ${house.colors[0]}` }}
              >
                <div className="card-body">
                  <h1>{house.emoji}</h1>
                  <h5>{house.house}</h5>
                  <small className="text-body-secondary">
                    Founded by {house.founder}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div
            className="card bg-primary text-white text-center p-4 shadow h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(getPath("My Library"))}
          >
            <h4>📖 My Library</h4>
            <p className="mb-0">Access your saved content</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div
            className="card bg-success text-white text-center p-4 shadow h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(getPath("Watchlist"))}
          >
            <h4>⭐ Watchlist</h4>
            <p className="mb-0">Your saved-for-later list</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div
            className="card bg-info text-white text-center p-4 shadow h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(getPath("About"))}
          >
            <h4>ℹ️ About Us</h4>
            <p className="mb-0">Learn more about VideoParlour</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
