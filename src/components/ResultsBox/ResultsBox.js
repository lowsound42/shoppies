import React, { useState, useEffect, useRef } from "react";
import "./ResultsBox.scss";
import NoResults from "../NoResults/NoResults";
import utilFunctions from "../../utilFunctions/api";

function ResultsBox(props) {
  const alreadyNominated = (item) => {
    let result = false;
    props.nominations.forEach((element) => {
      if (element.imdbID === item.imdbID) result = true;
    });
    return result;
  };
  const nominate = (item, index) => {
    if (props.nominations.length < 5 && !alreadyNominated(item)) {
      props.setNominations((prevState) => [...prevState, item]);
    }
  };

  const pageChange = (e) => {
    var pageHolder = props.searchResult.pageCount;

    if (e.target.value === "f") {
      pageHolder = props.searchResult.currentPage + 1;
    } else if (e.target.value === "b") {
      pageHolder = props.searchResult.currentPage - 1;
    }

    utilFunctions
      .pageCall(props.searchResult.query, pageHolder)
      .then(function (response) {
        console.log(response);
        props.setSearchResult({
          query: props.searchResult.query,
          responseStatus: response.Response,
          result: response.Search,
          pages: response.totalResults,
          currentPage: pageHolder,
        });
      });
  };

  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(props.nominations));
  }, [props.nominations]);

  return (
    <div className="resultsBox">
      <h3 className="resultsBox__title">
        {props.searchResult.query !== null
          ? `Results for "${props.searchResult.query}"`
          : "Search for a movie!"}
      </h3>

      <ul className="resultsBox__results">
        {props.searchResult.responseStatus === "True" ? (
          props.searchResult.result.map((item, index) => {
            if (item.Type === "movie") {
              return (
                <div className="resultsBox__results-items" key={item.imdbID}>
                  <li>
                    {item.Title} ({item.Year.slice(0, 4)})
                  </li>
                  <button
                    disabled={alreadyNominated(item) ? true : false}
                    onClick={() => {
                      nominate(item);
                    }}
                  >
                    Nominate
                  </button>
                </div>
              );
            } else {
              return null;
            }
          })
        ) : (
          <NoResults
            responseStatus={props.responseStatus}
            searchResult={props.searchResult}
          ></NoResults>
        )}
      </ul>
      {props.searchResult.responseStatus === "True" ? (
        <p className="resultsBox__pageCount">
          page {props.searchResult.currentPage} of &nbsp;
          {parseInt(props.searchResult.pages / 10) +
            (props.searchResult.pages % 10)}
        </p>
      ) : null}
      <div>
        <button
          className={props.searchResult.query !== null ? "visible" : "hidden"}
          disabled={props.searchResult.currentPage === 1 ? true : false}
          value="b"
          onClick={(e) => pageChange(e)}
        >
          back
        </button>
        <button
          className={props.searchResult.query !== null ? "visible" : "hidden"}
          disabled={
            props.searchResult.currentPage ===
            parseInt(props.searchResult.pages / 10) +
              (props.searchResult.pages % 10)
              ? true
              : false
          }
          value="f"
          onClick={(e) => pageChange(e)}
        >
          forward
        </button>
      </div>
    </div>
  );
}

export default ResultsBox;
