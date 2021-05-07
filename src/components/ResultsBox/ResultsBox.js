import React, { useState, useEffect } from "react";
import "./ResultsBox.scss";
import NoResults from "../NoResults/NoResults";
import utilFunctions from "../../utilFunctions/api";
import placeholder from "../../assets/placeholder.jpg";
import Modal from "../Modal/Modal";
function ResultsBox(props) {
  const [pagination, setPagination] = useState(0);
  const alreadyNominated = (item) => {
    let result = false;
    props.nominations.forEach((element) => {
      if (element.imdbID === item.imdbID) result = true;
    });
    return result;
  };
  const nominate = (item) => {
    console.log(item);
    if (props.nominations.length < 5 && !alreadyNominated(item)) {
      props.setNominations((prevState) => [...prevState, item]);
    }
  };

  useEffect(() => {
    if (props.searchResult.pages > 10) {
      setPagination(1);
    }
  }, [props.searchResult.pages]);

  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(props.nominations));
  }, [props.nominations]);

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

  return (
    <div className="resultsBox">
      <h3 className="resultsBox__title">
        {props.searchResult.query
          ? `Results for "${props.searchResult.query}"`
          : "Search for a movie!"}
      </h3>
      {props.modal ? (
        <Modal
          setModal={props.setModal}
          plot={props.plot}
          nominate={nominate}
          alreadyNominated={alreadyNominated}
        />
      ) : null}
      <ul className="resultsBox__results">
        {props.searchResult.responseStatus === "True" ? (
          props.searchResult.result.map((item, index) => {
            if (item.Type === "movie") {
              return (
                <div className="resultsBox__results-items" key={item.imdbID}>
                  <li className="resultsBox__results-items--content">
                    <div
                      className="resultsBox__results-items--content-box"
                      onClick={() => props.handleSelected(item.imdbID)}
                    >
                      <img
                        className="resultsBox__results-items--content-image"
                        src={item.Poster !== "N/A" ? item.Poster : placeholder}
                        alt="poster for a movie"
                      />
                      <p>
                        {item.Title} ({item.Year.slice(0, 4)})
                      </p>
                    </div>
                    <button
                      className="resultsBox__results-items--button"
                      disabled={alreadyNominated(item) ? true : false}
                      onClick={() => {
                        nominate(item);
                      }}
                    ></button>
                  </li>
                  <div className="resultsBox__results-items--more">
                    <button
                      className="resultsBox__results-items--more-button"
                      disabled={alreadyNominated(item) ? true : false}
                      onClick={() => {
                        nominate(item);
                      }}
                    ></button>
                  </div>
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
          {props.searchResult.pages}
          {props.searchResult.pages > 1
            ? " results!"
            : " result!"} <br></br> page &nbsp;
          {props.searchResult.currentPage} of &nbsp;
          {pagination ? parseInt(props.searchResult.pages / 10) + 1 : 1}
        </p>
      ) : null}
      <div className="resultsBox__scrollButtons">
        <button
          className={
            props.searchResult.query !== null && props.searchResult.result
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
          Previous
        </button>
        <button
          className={
            props.searchResult.query !== null && props.searchResult.result
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
          Next
        </button>
      </div>
    </div>
  );
}

export default ResultsBox;
