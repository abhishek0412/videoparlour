import { useState, useEffect } from "react";

interface Spell {
  spell: string;
  use: string;
  index: number;
}

const Trending = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://potterapi-fedeperin.vercel.app/en/spells")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch spells");
        return response.json();
      })
      .then((data: Spell[]) => {
        setSpells(data);
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
    <div>
      <h2 className="mb-2">✨ Trending Now</h2>
      <p className="lead text-muted">
        See what everyone is watching right now.
      </p>
      <div className="row">
        {spells.map((spell) => (
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
