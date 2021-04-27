import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import PokemonDetails from "../PokemonDetails/PokemonDetails.jsx";
import axios from "axios";

import styles from "./Cards.module.css";

const Cards = ({ fetchPoke }) => {
  const [getDataPoke, setGetDataPoke] = useState([]);
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonDetail, setPokemonDetail] = useState(false);

  async function concatDataPoke(dataPoke) {
    let pokemons = [];
    let aux1 = [];
    let aux2 = [];

    if (dataPoke.length !== undefined) {
      for (let i = 0; i < fetchPoke.length; i++) {
        const { data } = await axios.get(dataPoke[i].url);
        pokemons = aux1.concat(data);
        aux1 = aux2.concat(pokemons);
      }

      setGetDataPoke(pokemons);
    } else {
      setGetDataPoke([dataPoke]);
    }
  }

  const renderPokemonDetails = (pokemon) => {
    setPokemonDetail(!pokemonDetail);
    setPokemonData(pokemon);
  };

  useEffect(() => {
    concatDataPoke(fetchPoke);
  }, [fetchPoke]);

  return (
    <>
      {fetchPoke.length !== undefined ? (
        <div className={styles.cards}>
          {getDataPoke.map((pokemon) => (
            <div key={pokemon.id} className={styles.card}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />

              <div className={styles.cardDetails}>
                <h1>{pokemon.name}</h1>
                <div>
                  <h2>{`Nº ${pokemon.id}`}</h2>
                  <span>Type(s):</span>
                  {pokemon.types.map((types) => (
                    <span> {types.type.name} </span>
                  ))}
                </div>
              </div>

              <button onClick={() => renderPokemonDetails(pokemon)}>
                <p>
                  D<br />E <br />T <br />A <br />I <br />L <br />S
                </p>
              </button>
            </div>
          ))}

          <button
            type="button"
            className={pokemonDetail ? styles.btnClose : styles.btnCloseHidden}
            onClick={() => renderPokemonDetails()}
          >
            <AiFillCloseCircle color="red" size="1.8rem" />
          </button>

          {pokemonDetail ? <PokemonDetails pokemonData={pokemonData} /> : null}
        </div>
      ) : (
        <div className={styles.pokemonDetails}>
          <div className={styles.cardPoke}>
            {getDataPoke.map((pokemon) => (
              <div key={pokemon.id} className={styles.details}>

                <h2>{`Nº ${pokemon.id}`}</h2>
                <h1>{pokemon.name}</h1>

                <div className={styles.pokemonInfo}>
                  <div>
                    <h4>Weight: {pokemon.weight / 10}kg</h4>
                    <h4>Height: {pokemon.height / 10}m</h4>
                    <span>Type(s):</span>
                    {pokemon.types.map((types) => (
                      <span> {types.type.name} </span>
                    ))}
                  </div>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <div className={styles.skills}>
                    <br/>
                    <span>Skills:</span>
                    {pokemon.moves.map((skill) => (
                        <span> {skill.move.name} </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
