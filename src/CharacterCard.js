import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { fetchCharacterDetails } from "./charactersSlice";

const CharacterCardWithModal = ({ character }) => {
  const dispatch = useDispatch();
  const randomImage = `https://picsum.photos/200?random=${Math.floor(
    Math.random() * 1000
  )}`;
  const speciesColor =
    character.species && character.species.includes("Human")
      ? "lightblue"
      : "lightgreen";

  const [open, setOpen] = useState(false);

  const handleCardClick = () => {
    dispatch(fetchCharacterDetails(character.url));
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const birthYear = character.birth_year;
  const createdDate = new Date(character.created).toLocaleDateString("en-GB");

  const homeworld = character.homeworld ? character.homeworld : {};
  const residentsCount = homeworld.residents ? homeworld.residents.length : 0;

  return (
    <div>
      {/* Character Card */}
      <div
        className="character-card"
        style={{ backgroundColor: speciesColor }}
        onClick={handleCardClick}
      >
        <img src={randomImage} alt={character.name} />
        <h3>{character.name}</h3>
      </div>

      {/* Modal with Character Details */}
      <Modal
        isOpen={open}
        onRequestClose={handleModalClose}
        contentLabel="Character Details"
      >
        <h2>{character.name}</h2>
        <p>
          <strong>Height:</strong> {character.height} meters
        </p>
        <p>
          <strong>Mass:</strong> {character.mass} kg
        </p>
        <p>
          <strong>Date Added:</strong> {createdDate}
        </p>
        <p>
          <strong>Films:</strong> {character.films.length}
        </p>
        <p>
          <strong>Birth Year:</strong> {birthYear}
        </p>

        {homeworld.name && (
          <div>
            <h3>Homeworld</h3>
            <p>
              <strong>Name:</strong> {homeworld.name}
            </p>
            <p>
              <strong>Terrain:</strong> {homeworld.terrain}
            </p>
            <p>
              <strong>Climate:</strong> {homeworld.climate}
            </p>
            <p>
              <strong>Residents:</strong> {residentsCount}
            </p>
          </div>
        )}
        <button className="back" onClick={handleModalClose}>
          Back
        </button>
      </Modal>
    </div>
  );
};

export default CharacterCardWithModal;