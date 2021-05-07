import React from "react";
import "./SearchBox.scss";

function SearchBox(props) {
  return (
    <>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search for a movie here"
          onChange={(e) => props.setFormInput(e.target.value)}
        />
      </div>
    </>
  );
}

export default SearchBox;
