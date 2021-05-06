import React, { useState } from "react";
import "./App.scss";
import SearchBox from "../SearchBox/SearchBox";
import ResultsBox from "../ResultsBox/ResultsBox";
import NominationsBox from "../NominationsBox/NominationsBox";
import Banner from "../Banner/Banner";

function App() {
  const [searchResult, setSearchResult] = useState({
    query: null,
    responseStatus: null,
    result: null,
    pages: null,
    currentPage: 1,
  });

  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations"))
  );

  return (
    <div className="appContainer">
      <Banner nominations={nominations} />
      <section className="titleContainer">
        <h1 className="titleContainer__title">The Shoppies</h1>
      </section>
      <SearchBox setSearchResult={setSearchResult}></SearchBox>
      <div className="dynamicContainer">
        <ResultsBox
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setNominations={setNominations}
          nominations={nominations}
        />
        <NominationsBox
          nominations={nominations}
          setNominations={setNominations}
        />
      </div>
    </div>
  );
}

export default App;
