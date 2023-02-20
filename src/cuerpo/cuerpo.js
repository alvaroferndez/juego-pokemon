import './cuerpo.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../card/card';


function Cuerpo() {
      var [listaPokemons, setListaPokemons] = useState([]);

      var [peticion, setPeticion] = useState('https://pokeapi.co/api/v2/pokemon');


      useEffect(() => obtenerDatos(), [])

      function obtenerDatos() {
            fetch(peticion)
                  .then((datos) => datos.json())
                  .then((datosApi) => {
                        setListaPokemons(listaPokemons.concat(datosApi.results));
                        setPeticion(datosApi.next);
                  })
      }



      function traerMas() {
            obtenerDatos()
      }

      return <>
            <ul className='contenedor-cards'>{listaPokemons.map((pokemon) =>
                  <Card key={pokemon.name} pokemon={pokemon} />
            )}</ul>
            <div className='buscador'>
                  <section>
                        <label>Mostrar los siguiente pokemons</label>
                        <button id='todos' className='boton' onClick={traerMas}>Buscar</button>
                  </section>
            </div>
      </>
}

export default Cuerpo;