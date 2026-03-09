import { useState } from 'react';
import { API_ENDPOINTS } from '../../constants';
import type { Character } from '../../types';
import Alert from './Alert';

const Button = () => {
  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!search.trim()) return;
    setLoading(true);
    setError(null);

    fetch(`${API_ENDPOINTS.CHARACTERS}?search=${encodeURIComponent(search)}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch characters');
        return response.json();
      })
      .then((data: Character[]) => {
        setCharacters(data);
        setLoading(false);
        if (data.length === 0) setError('No characters found.');
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search a character (e.g. Harry, Hermione)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <Alert heading="danger" message={error} />}

      <div className="row">
        {characters.map((character) => (
          <div className="col-md-6 col-lg-4 mb-4" key={character.index}>
            <div className="card h-100 shadow-sm">
              <img
                src={character.image}
                className="card-img-top"
                alt={character.fullName}
                style={{
                  height: '300px',
                  objectFit: 'contain',
                  padding: '1rem',
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{character.fullName}</h5>
                <p className="card-text">
                  <strong>Nickname:</strong> {character.nickname}
                </p>
                <p className="card-text">
                  <strong>House:</strong>{' '}
                  <span className="badge bg-info">
                    {character.hogwartsHouse}
                  </span>
                </p>
                <p className="card-text">
                  <strong>Played by:</strong> {character.interpretedBy}
                </p>
                <p className="card-text">
                  <strong>Birthdate:</strong> {character.birthdate}
                </p>
                {character.children.length > 0 && (
                  <p className="card-text">
                    <strong>Children:</strong> {character.children.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Button;
