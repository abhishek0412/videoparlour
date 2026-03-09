import { useFetch } from '../../hooks';
import { API_ENDPOINTS } from '../../constants';
import type { Spell } from '../../types';

const Trending = () => {
  const {
    data: spells,
    loading,
    error,
  } = useFetch<Spell[]>(API_ENDPOINTS.SPELLS);

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
    <div>
      <h2 className="mb-2">✨ Trending Now</h2>
      <p className="lead text-muted">
        See what everyone is watching right now.
      </p>
      <div className="row">
        {(spells ?? []).map((spell) => (
          <div className="col-md-4 col-lg-3 mb-3" key={spell.index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{spell.spell}</h5>
                <p className="card-text text-body-secondary">{spell.use}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
