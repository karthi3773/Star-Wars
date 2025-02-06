import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, setCurrentPage } from "./charactersSlice";
import CharacterCard from "./CharacterCard";
import Loader from "./Loader";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { characters, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage, dispatch]);

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    } else if (direction === "prev" && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div className="app">
      <h1 style={{ textAlign: "center", margin: 0, marginBottom: "15px" }}>
        Star Wars Characters
      </h1>

      {loading && <Loader />}
      {error && <div>{error}</div>}

      <div className="character-list">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePagination("prev")}
          disabled={currentPage === 1}
          className="button"
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination("next")}
          disabled={currentPage === totalPages}
          className="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
