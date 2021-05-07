import React from "react";
import "./Modal.scss";
import imdbLogo from "../../assets/imdb-brands.svg";
import rtLogo from "../../assets/RottenTomatoes.jpg";
import placeholder from "../../assets/placeholder.jpg";

function Modal(props) {
  return (
    <div className="modalContainer">
      <div className="modalContainer__top">
        <p className="modalContainer__top-title">{props.plot.Title}</p>
        <p
          className="modalContainer__top-close"
          onClick={() => props.setModal(0)}
        >
          X
        </p>
      </div>
      <img
        className="modalContainer__poster"
        src={props.plot.Poster !== "N/A" ? props.plot.Poster : placeholder}
        alt="movie poster"
      />
      <div className="modalContainer__mid">
        <p className="modalContainer__mid-director">
          <span>Director:</span> {props.plot.Director}
        </p>
        <p className="modalContainer__mid-release">
          <span>Released: </span>
          {props.plot.Released}
        </p>
      </div>
      <p className="modalContainer__plot">{props.plot.Plot}</p>
      {props.plot.Ratings && props.plot.Ratings[0] ? (
        <p className="modalContainer__imdb">
          <img src={imdbLogo} alt="imdb logo" />
          {props.plot.Ratings[0].Value}
        </p>
      ) : null}
      {props.plot.Ratings && props.plot.Ratings[1] ? (
        <p className="modalContainer__rotten">
          <img src={rtLogo} alt="rotten tomatoes logo" />
          {props.plot.Ratings[1].Value}
        </p>
      ) : null}
    </div>
  );
}

export default Modal;
