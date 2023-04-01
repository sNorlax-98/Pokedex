import { useState } from 'react';
import axios from 'axios';
import  './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSearch = () => {
    if (!searchTerm) {
      return;
    }
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      .then(response => {
        setSelectedPokemon(response.data);
      })
      .catch(error => {
        console.log(error);
        setSelectedPokemon(null);
      });
  }
  
  return (
    <div>
      <div className='search-div'>
        <input className='input' type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <button className='btn' onClick={handleSearch}>Search</button>
      </div>
      {selectedPokemon ?
        <div className='card'>
          <h1>{selectedPokemon.name}</h1>
          <img className='poke-img img-front' src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <img className='poke-img img-back' src={selectedPokemon.sprites.back_default} alt={selectedPokemon.name} />
          <h3>{selectedPokemon.species.name}</h3>
          <ul>{selectedPokemon.abilities.map(d=>{
            return <li> {(d.ability.name).toUpperCase()} </li>
          })}</ul>
          <p>{}</p>
        </div> :
        null
      }
    </div>
  );
}

export default App;
