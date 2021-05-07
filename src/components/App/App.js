import React, { useState } from "react";
import "./App.scss";
import SearchBox from "../SearchBox/SearchBox";
import ResultsBox from "../ResultsBox/ResultsBox";
import NominationsBox from "../NominationsBox/NominationsBox";
import Banner from "../Banner/Banner";

function App() {
  const [showResults, setShowResults] = useState(0);
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

  return (
    <div className="appContainer">
      <Banner nominations={nominations} />
      <section className="titleContainer">
        <h1 className="titleContainer__title">The Shoppies</h1>
      </section>
      <SearchBox
        setShowResults={setShowResults}
        setSearchResult={setSearchResult}
      ></SearchBox>
      <div className="dynamicContainer">
        {showResults ? (
          <ResultsBox
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            setNominations={setNominations}
            nominations={nominations}
          />
        ) : null}
      </div>
      {nominations[0] ? (
        <NominationsBox
          nominations={nominations}
          setNominations={setNominations}
        />
      ) : null}
    </div>
  );
}

export default App;
