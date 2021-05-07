import React from "react";
import "./NoResults.scss";

function NoResults(props) {
  return (
    <>{props.searchResult.query !== null ? <p>No results to show</p> : null}</>
  );
}

export default NoResults;
