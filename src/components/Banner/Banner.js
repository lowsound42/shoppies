import React from "react";
import "./Banner.scss";

function Banner(props) {
  return (
    <div className="bannerContainer">
      <p>Thanks for your nominations! Feel free to make changes.</p>
      <p>
        Ready to submit?&nbsp;
        <span>
          Make your way&nbsp;
          <a href="https://www.getomar.tech" target="_blank" rel="noreferrer">
            here
          </a>
        </span>
        .
      </p>
    </div>
  );
}

export default Banner;
