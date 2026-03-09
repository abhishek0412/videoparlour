import { useLikes } from '../../hooks';

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
  const { isLiked, toggleLike } = useLikes();
  const id = `book-${number}`;
  const liked = isLiked(id);

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border border-2 border-primary rounded-3">
        <div className="position-relative">
          <img
            src={cover}
            className="card-img-top"
            alt={title}
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <button
            className="btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: liked ? '#dc3545' : 'rgba(255,255,255,0.85)',
              border: 'none',
              fontSize: '1.2rem',
              transition: 'all 0.2s ease',
            }}
            onClick={() => toggleLike(id)}
            title={liked ? 'Remove from favourites' : 'Add to favourites'}
          >
            {liked ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <span className="badge bg-primary me-2">#{number}</span>
            {title}
          </h5>
          <p className="card-text text-muted flex-grow-1">
            {description.length > 150
              ? description.substring(0, 150) + '...'
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
