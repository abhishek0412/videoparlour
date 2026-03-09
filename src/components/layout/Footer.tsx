import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../constants';
import { getPath } from '../../utils';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-body-tertiary py-4 mt-5 border-top">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="fw-bold">🎬 VideoParlour</h5>
            <p className="text-body-secondary mb-0">
              Your one-stop destination for movies, spells, and the wizarding
              world.
            </p>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="row">
          {FOOTER_LINKS.map((section) => (
            <div className="col-6 col-md-3 mb-3" key={section.heading}>
              <h6 className="text-uppercase fw-bold">{section.heading}</h6>
              <ul className="list-unstyled">
                {section.items.map((item) => {
                  const path = getPath(item.name);
                  return (
                    <li key={item.name}>
                      {path !== '/' || item.name === 'Home' ? (
                        <Link
                          className="text-body-secondary text-decoration-none"
                          to={path}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-body-secondary">{item.name}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border-secondary" />
        <p className="text-center text-body-secondary mb-0">
          &copy; {currentYear} VideoParlour. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
