import React, { useState } from "react";
import "./SearchBox.scss";
import utilFunctions from "../../utilFunctions/api";

function SearchBox(props) {
  const [formInput, setFormInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput !== null) {
      utilFunctions.initialCall(formInput).then(function (response) {
        console.log(response);
        props.setSearchResult({
          query: formInput,
          responseStatus: response.Response,
          result: response.Search,
          pages: response.totalResults,
          currentPage: 1,
        });
      });
    }
  };

  return (
    <>
      <div className="searchBox">
        <h3 className="searchBox__title">Movie Title</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => setFormInput(e.target.value)} />
          <input type="submit" text="submit" />
        </form>
      </div>
    </>
  );
}

export default SearchBox;
