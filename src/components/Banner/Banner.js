import React from "react";
import "./Banner.scss";

function Banner(props) {
  return (
    <div className="bannerContainer">
      {props.nominations.length === 5 ? (
        <p>Thanks for your nominations! Feel free to make changes.</p>
      ) : null}
    </div>
  );
}

export default Banner;
