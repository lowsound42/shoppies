import React, { useState, useEffect, useRef } from "react";
import "./ResultsBox.scss";
import NoResults from "../NoResults/NoResults";
import utilFunctions from "../../utilFunctions/api";
import placeholder from "../../assets/placeholder.jpg";

function ResultsBox(props) {
  const [pagination, setPagination] = useState(0);

  const element = useRef(null);
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

  useEffect(() => {
    if (props.searchResult.pages > 10) {
      setPagination(1);
    }
  }, [props.searchResult.pages]);

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

      <ul className="resultsBox__results" ref={element}>
        {props.searchResult.responseStatus === "True" ? (
          props.searchResult.result.map((item, index) => {
            console.log(item);

            if (item.Type === "movie") {
              return (
                <div className="resultsBox__results-items" key={item.imdbID}>
                  <li className="resultsBox__results-items--title">
                    <p>
                      {item.Title} ({item.Year.slice(0, 4)})
                    </p>
                    <img
                      className="resultsBox__results-items--image"
                      src={item.Poster !== "N/A" ? item.Poster : placeholder}
                      alt="poster for a movie"
                    />
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
          {props.searchResult.pages} results! <br></br> page &nbsp;
          {props.searchResult.currentPage} of &nbsp;
          {pagination ? parseInt(props.searchResult.pages / 10) + 1 : 1}
        </p>
      ) : null}
      <div className="resultsBox__scrollButtons">
        <button
          className={
            props.searchResult.query !== null
              ? "resultsBox__scrollButtons-button visible"
              : "hidden"
          }
          disabled={
            pagination === 1 && props.searchResult.currentPage === 1
              ? true
              : false
          }
          value="b"
          onClick={(e) => pageChange(e)}
        >
          Previous ten
        </button>
        <button
          className={
            props.searchResult.query !== null
              ? "resultsBox__scrollButtons-button  visible"
              : "hidden"
          }
          disabled={
            pagination === 1 &&
            props.searchResult.currentPage ===
              parseInt(props.searchResult.pages / 10) + 1
              ? true
              : false
          }
          value="f"
          onClick={(e) => pageChange(e)}
        >
          Next ten
        </button>
      </div>
    </div>
  );
}

export default ResultsBox;
