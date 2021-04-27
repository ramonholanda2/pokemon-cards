import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

import Cards from "./components/Cards/Cards.jsx";

const App = () => {
  const [fetchPoke, setFetchPoke] = useState([]);
  const [fetchPokeUpdateListNext, setFetchPokeUpdateListNext] = useState(9);
  const [fetchPokeUpdateListBack, setFetchPokeUpdateListBack] = useState(0);


  const fetchedPoke = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9`);

    setFetchPoke(data.results);
  };

  const searchPokemon = async() => {
    const valuePokemon = document.querySelector('.searchPokemon input');
    
    if(valuePokemon.value!='') {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${valuePokemon.value}`);
  
      setFetchPoke(data);
    }

  }
  
  const returnHome = async() => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9`);

    setFetchPoke(data.results);
    setFetchPokeUpdateListNext(9);
    setFetchPokeUpdateListBack(0);
  }
  
  const nextPokemonList = async() => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${fetchPokeUpdateListNext}&limit=9`);
    
    setFetchPoke(data.results);

    setFetchPokeUpdateListNext(fetchPokeUpdateListNext+9);
    setFetchPokeUpdateListBack(fetchPokeUpdateListNext-9);
  }

  const backPokemonList = async() => {
    if(fetchPokeUpdateListBack >= 0 ) {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${fetchPokeUpdateListBack}&limit=9`);
      
      setFetchPoke(data.results);
  
      setFetchPokeUpdateListBack(fetchPokeUpdateListBack-9);
      setFetchPokeUpdateListNext(fetchPokeUpdateListBack+9);
    }
  }

  useEffect(() => {
    fetchedPoke();
  }, []);
  useEffect(() => {

  }, [])

  return (
    <>
      <div className='searchPokemon'>
        <button onClick={() => returnHome()} >Home</button>
        <input type="text"/>
        <button onClick={() => searchPokemon()}>Search</button>
      </div>
      <Cards fetchPoke={fetchPoke} />
      <div className="btns">
        <button onClick={() => backPokemonList()}>Back</button>
        <button onClick={() => nextPokemonList()}>Next</button>
      </div>
    </>
  );
};

export default App;
