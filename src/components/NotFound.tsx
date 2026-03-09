import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Amazon-style: rotate through fun dog images with playful captions
const dogs = [
  {
    img: "https://images.dog.ceo/breeds/retriever-golden/n02099601_7771.jpg",
    name: "Baxter",
    breed: "Golden Retriever",
  },
  {
    img: "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1030.jpg",
    name: "Biscuit",
    breed: "Corgi",
  },
  {
    img: "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
    name: "Luna",
    breed: "Husky",
  },
  {
    img: "https://images.dog.ceo/breeds/samoyed/n02111889_4957.jpg",
    name: "Snowball",
    breed: "Samoyed",
  },
  {
    img: "https://images.dog.ceo/breeds/labrador/n02099712_3825.jpg",
    name: "Charlie",
    breed: "Labrador",
  },
  {
    img: "https://images.dog.ceo/breeds/poodle-standard/n02113799_2285.jpg",
    name: "Muffin",
    breed: "Poodle",
  },
];

const quips = [
  "Ruh-roh! This page ran away.",
  "This page is playing fetch… and hasn't come back.",
  "Looks like this page is on a walk. Try another route!",
  "We sniffed everywhere but couldn't find that page.",
  "This page is taking a nap. Try heading home!",
  "Oops! This page rolled over and disappeared.",
];

const NotFound = () => {
  const [dog, setDog] = useState(dogs[0]);
  const [quip, setQuip] = useState(quips[0]);

  const shuffle = () => {
    setDog(dogs[Math.floor(Math.random() * dogs.length)]);
    setQuip(quips[Math.floor(Math.random() * quips.length)]);
  };

  // Pick a random dog on first load
  useEffect(() => {
    shuffle();
  }, []);

  return (
    <div className="text-center py-5">
      {/* Big 404 header */}
      <h1
        className="display-1 fw-bold mb-0"
        style={{
          fontSize: "8rem",
          background: "linear-gradient(135deg, #6f42c1, #0d6efd)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404
      </h1>

      <p className="fs-4 text-body-secondary mb-4">{quip}</p>

      {/* Dog card – Amazon style */}
      <div
        className="card mx-auto shadow-lg border-0 overflow-hidden"
        style={{ maxWidth: "400px" }}
      >
        <img
          src={dog.img}
          alt={`${dog.name} the ${dog.breed}`}
          className="card-img-top"
          style={{ height: "320px", objectFit: "cover" }}
        />
        <div className="card-body bg-body-tertiary">
          <p className="card-text mb-0">
            <strong>{dog.name}</strong>{" "}
            <span className="text-body-secondary">the {dog.breed}</span>
          </p>
          <small className="text-body-secondary">Dogs of VideoParlour 🐾</small>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
        <Link to="/" className="btn btn-primary btn-lg px-4">
          🏠 Go Home
        </Link>
        <button
          className="btn btn-outline-secondary btn-lg px-4"
          onClick={shuffle}
        >
          🐶 Meet Another Dog
        </button>
      </div>

      <p
        className="text-body-secondary mt-4 mb-0"
        style={{ fontSize: "0.85rem" }}
      >
        If you think this page should exist,{" "}
        <Link to="/about" className="text-decoration-none">
          let us know
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
