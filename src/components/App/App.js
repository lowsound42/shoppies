import React, { useEffect, useState } from "react";
import "./App.scss";
import SearchBox from "../SearchBox/SearchBox";
import ResultsBox from "../ResultsBox/ResultsBox";
import NominationsBox from "../NominationsBox/NominationsBox";
import Banner from "../Banner/Banner";
import NomPlaceholder from "../NomPlaceholder/NomPlaceholder";
import utilFunctions from "../../utilFunctions/api";

function App() {
  const [showResults, setShowResults] = useState(0);
  const [formInput, setFormInput] = useState(null);
  const [searchResult, setSearchResult] = useState({
    query: null,
    responseStatus: null,
    result: null,
    pages: null,
    currentPage: 1,
  });
  const cachedNominations = JSON.parse(localStorage.getItem("nominations"));

  const [nominations, setNominations] = useState(
    cachedNominations ? cachedNominations : []
  );

  useEffect(() => {
    const handleSubmit = (e) => {
      setShowResults(1);
      if (formInput !== null) {
        utilFunctions.initialCall(formInput.trim()).then(function (response) {
          setSearchResult({
            query: formInput,
            responseStatus: response.Response,
            result: response.Search,
            pages: response.totalResults,
            currentPage: 1,
          });
        });
      }
    };
    handleSubmit();
  }, [formInput]);

  return (
    <div className="appContainer">
      {nominations.length === 5 ? <Banner nominations={nominations} /> : null}
      <div className="topContainer">
        <h1 className="topContainer__title">The Shoppies</h1>
        <SearchBox
          setFormInput={setFormInput}
          setShowResults={setShowResults}
          setSearchResult={setSearchResult}
        ></SearchBox>
      </div>
      <div className="bottomContainer">
        {showResults ? (
          <ResultsBox
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            setNominations={setNominations}
            nominations={nominations}
          />
        ) : null}
        {nominations[0] ? (
          <NominationsBox
            nominations={nominations}
            setNominations={setNominations}
          />
        ) : (
          <NomPlaceholder />
        )}
      </div>
      {nominations.length === 5 ? <div className="footerSpacer"></div> : null}
    </div>
  );
}

export default App;
