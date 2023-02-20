import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Card(props) {
      var [datos_pokemon, setDatosPokemon] = useState([]);
      var [imagen, setImagen] = useState('');
      var [tipo, setTipo] = useState('');

      useEffect(() => obtenerDatosPokemon(), [])

      function obtenerDatosPokemon() {
            fetch('https://pokeapi.co/api/v2/pokemon/' + props.pokemon.name)
                  .then((datos) => datos.json())
                  .then((datos) => {
                        setDatosPokemon(datos_pokemon = (datos));
                        setImagen(datos.sprites.front_default)
                        obtenerTipo(datos_pokemon.types[0].type.name);
                        
                  })
      }

      function obtenerTipo(tipo){
            switch (tipo){
                  case 'normal':
                        setTipo('normal');
                        break
                  case 'fighting':
                        setTipo('lucha');
                        break
                  case 'flying':
                        setTipo('volador');
                        break
                  case 'poison':
                        setTipo('veneno');
                        break
                  case 'ghost':
                        setTipo('fantasma');
                        break
                  case 'ground':
                              setTipo('tierra');
                              break
                  case 'bug':
                              setTipo('bicho');
                              break
                  case 'steel':
                              setTipo('acero');
                              break
                  case 'fire':
                              setTipo('fuego');
                              break
                  case 'water':
                              setTipo('agua');
                              break
                  case 'grass':
                              setTipo('planta');
                              break
                  case 'electric':
                              setTipo('electrico');
                              break
                  case 'psychic':
                              setTipo('psiquico');
                              break
                  case 'ice':
                              setTipo('hielo');
                              break
                  case 'dragon':
                              setTipo('dragon');
                              break    
                  case 'dark':
                              setTipo('siniestro');
                              break    
                  case 'fairy':
                              setTipo('hada');
                              break    
                  case 'unknown':
                              setTipo('desconocido');
                              break    
                  case 'shadow':
                              setTipo('oscuro');
                              break      
                  default:
                        setTipo('Sin tipo')
            }
      }

      return <>
            <Link to={"detalle/" + datos_pokemon.name}>
                  <div key={datos_pokemon.name} className='card'>
                        <li className='parte parte1'>
                              <div className='contenido'>
                                    <img src={imagen} alt={datos_pokemon.name} />
                              </div>
                        </li>
                        <li className='parte parte2'>
                              <div className='contenido'>
                                    <p>Nombre: {datos_pokemon.name}</p>
                                    <br />
                                    <p>Experiencia base: {datos_pokemon.base_experience}xp</p>
                                    <p>Altura: {datos_pokemon.height}cm</p>
                                    <p>Peso: {datos_pokemon.weight/10}kg</p>
                                    <p>Tipo: {tipo}</p>
                              </div>
                              
                        </li>
                  </div>
            </Link>
      </>
}