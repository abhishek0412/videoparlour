import { useState, useEffect } from "react";

interface House {
  house: string;
  emoji: string;
  founder: string;
  colors: string[];
  animal: string;
  index: number;
}

const Documentries = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://potterapi-fedeperin.vercel.app/en/houses")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch houses");
        return response.json();
      })
      .then((data: House[]) => {
        setHouses(data);
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
      <h2 className="mb-2">🏠 Documentaries</h2>
      <p className="lead text-muted">
        Eye-opening documentaries from around the world.
      </p>
      <div className="row">
        {houses.map((house) => (
          <div className="col-md-6 col-lg-3 mb-4" key={house.index}>
            <div
              className="card h-100 shadow-sm text-center"
              style={{
                borderTop: `4px solid ${house.colors[0]}`,
              }}
            >
              <div className="card-body">
                <h1>{house.emoji}</h1>
                <h4 className="card-title">{house.house}</h4>
                <p className="card-text">
                  <strong>Founder:</strong> {house.founder}
                </p>
                <p className="card-text">
                  <strong>Animal:</strong> {house.animal}
                </p>
                <div>
                  {house.colors.map((color) => (
                    <span
                      key={color}
                      className="badge me-1"
                      style={{ backgroundColor: color, color: "#fff" }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documentries;
