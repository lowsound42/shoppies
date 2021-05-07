import React from "react";
import "./SearchBox.scss";

function SearchBox(props) {
  return (
    <>
      <div className="searchBox">
        <h3 className="searchBox__title">Movie Title</h3>
        <form>
          <input
            type="text"
            onChange={(e) => props.setFormInput(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}

export default SearchBox;
