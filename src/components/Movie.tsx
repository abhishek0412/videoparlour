interface MovieProps {
  number: number;
  title: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
}

const Movie = ({
  number,
  title,
  releaseDate,
  description,
  pages,
  cover,
}: MovieProps) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border border-2 border-primary rounded-3">
        <img
          src={cover}
          className="card-img-top"
          alt={title}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <span className="badge bg-primary me-2">#{number}</span>
            {title}
          </h5>
          <p className="card-text text-muted flex-grow-1">
            {description.length > 150
              ? description.substring(0, 150) + "..."
              : description}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted">{releaseDate}</small>
            <span className="badge bg-secondary">{pages} pages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
