import React from "react";
import "./NominationsBox.scss";

function NominationsBox(props) {
  const removeNomination = (item) => {
    props.setNominations((prevState) =>
      prevState.filter((value) => value !== item)
    );
  };

  return (
    <div className="nominationsBox">
      <p className="nominationsBox__title">Your Nominees</p>
      <ul className="nominationsBox__list">
        {props.nominations[0] !== undefined ? (
          props.nominations.map((item, index) => {
            return (
              <div className="nominationsBox__list-item" key={index}>
                <li>{item.Title}</li>
                <button
                  className="nominationsBox__list-item--button"
                  onClick={() => removeNomination(item)}
                ></button>
              </div>
            );
          })
        ) : (
          <p>Waiting for nominations</p>
        )}
      </ul>
    </div>
  );
}

export default NominationsBox;
