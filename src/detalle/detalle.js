import './detalle.css';
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from 'react-router-dom';

function Detalle() {
      var { nombre } = useParams();

      var [hecho, setHecho] = useState(false);

      var [datos_pokemon, setDatosPokemon] = useState([]);
      var [imagen, setImagen] = useState('');
      var [pokeball1, setPokeball1] = useState(false);
      var [pokeball2, setPokeball2] = useState(false);
      var [habilidad, setHabilidad] = useState({nombre:'',descripcion:''});
      var [stats, setStats] = useState({vida:0,ataque:0,defensa:0,atq_especial:0,def_especial:0,velocidad:0});
      var [movimientos, setMovimientos] = useState(['']);
      var [tipo, setTipo] = useState('');


      useEffect(() => obtenerDatosPokemon(), [])

      function obtenerDatosPokemon() {
            fetch('https://pokeapi.co/api/v2/pokemon/' + nombre)
                  .then((datos) => datos.json())
                  .then((datos) => {
                        setDatosPokemon(datos_pokemon = (datos));
                        setImagen(datos.sprites.other.dream_world.front_default)
                        if(!hecho){
                              obtenerHabilidad(datos_pokemon.abilities);
                              obtenerStats(datos_pokemon.stats);
                              obtenerMovimientos(datos_pokemon.moves);
                        }
                  })
      }

      function obtenerHabilidad(habilidades){
            var numero = Math.floor(Math.random() * habilidades.length)
            var nombre = datos_pokemon.abilities[numero].ability.name;
            peticionHabilidad(datos_pokemon.abilities[numero].ability.url,nombre)
      }

      
      function peticionHabilidad(peticion,nombre){
            fetch(peticion)
                  .then((datos) => datos.json())
                  .then((datos) => {
                        var descrip = "";
                        if(datos.effect_entries[1].effect.length > 150){
                              for(let i = 0; i<151; i++){
                                    descrip = descrip + datos.effect_entries[1].effect[i]
                              }
                              descrip = descrip + '...';
                        }else{
                              descrip = datos.effect_entries[1].effect
                        }
                        setHabilidad({nombre:nombre,descripcion:descrip})
                  })
      }

      function obtenerMovimientos(movimientos){
            var numeros = [];
            while(numeros.length < 4){
                  var numero = Math.floor(Math.random() * movimientos.length)
                  // eslint-disable-next-line no-loop-func
                  if(numeros.find((element) => element === numero) || numero === 0){
                        continue
                  }else{
                        numeros.push(numero)
                  }
            }
            var movimientos_lista = []
            for(let i=0; i<4; i++){
                  peticionMovimiento('https://pokeapi.co/api/v2/move/' + numeros[i],movimientos_lista);
            }

      }

      function peticionMovimiento(peticion,movimientos_lista){
            fetch(peticion)
                  .then((datos) => datos.json())
                  .then((datos) => {
                        movimientos_lista.push(datos)
                        setMovimientos(movimientos = movimientos_lista)
                        if(movimientos_lista.length === 4){
                              setHecho(true);
                        }
                  })
      }

      function obtenerTipo(tipo){
            var resultado = '';
            switch (tipo){
                  case 'normal':
                        resultado =('normal');
                        break
                  case 'fighting':
                        resultado =('lucha');
                        break
                  case 'flying':
                        resultado =('volador');
                        break
                  case 'poison':
                        resultado =('veneno');
                        break
                  case 'ghost':
                        resultado =('fantasma');
                        break
                  case 'ground':
                              resultado =('tierra');
                              break
                  case 'bug':
                              resultado =('bicho');
                              break
                  case 'steel':
                              resultado =('acero');
                              break
                  case 'fire':
                              resultado =('fuego');
                              break
                  case 'water':
                              resultado =('agua');
                              break
                  case 'grass':
                              resultado =('planta');
                              break
                  case 'electric':
                              resultado =('electrico');
                              break
                  case 'psychic':
                              resultado =('psiquico');
                              break
                  case 'ice':
                              resultado =('hielo');
                              break
                  case 'dragon':
                              resultado =('dragon');
                              break    
                  case 'dark':
                              resultado =('siniestro');
                              break    
                  case 'fairy':
                              resultado =('hada');
                              break    
                  case 'unknown':
                              resultado =('desconocido');
                              break    
                  case 'shadow':
                              resultado =('oscuro');
                              break      
                  default:
                        resultado =('Sin tipo')
            }
            return resultado
      }

      function obtenerStats(stats){
            setStats({vida:stats[0].base_stat,ataque:stats[1].base_stat,defensa:stats[2].base_stat,atq_especial:stats[3].base_stat,def_especial:stats[4].base_stat,velocidad:stats[5].base_stat})
      }

      function pokeball1False(){
            setPokeball1(pokeball1 = false)
      }
      
      function pokeball1True(){
            setPokeball1(pokeball1 = true)
      }

      function pokeball2False(){
            setPokeball2(pokeball2 = false)
      }

      function pokeball2True(){
            setPokeball2(pokeball2 = true)
      }

      if(hecho){
            return <>
            <div className='nombre-pokemon-detalle'>
                  <h1 className='nombre-pokemon-detalle'>{datos_pokemon.name}</h1>
            </div>
            <div className='contenedor-detalle'>
                  {pokeball1 ===true && <div onMouseLeave={pokeball1False}  className='contenedor-stats'>
                              <div className='izquierda'>
                                    <div className='global'>
                                          <div className='stats-izquierda'>
                                                <div className='n_pokedex flex'>
                                                      <span className='clave'>N.º Pokédex</span>
                                                      <span className='valor'>{datos_pokemon.id}</span>
                                                </div>
                                                <div className='nombre flex'>
                                                      <span className='clave'>Nombre</span>
                                                      <span className='valor'>{datos_pokemon.name}</span>
                                                </div>
                                                <div className='tipo flex'>
                                                      <span className='clave'>Tipo</span>
                                                      <span className='valor'>{datos_pokemon.types.map((element) => (
                                                            <span key={element.type.name}>{obtenerTipo(element.type.name)}</span>
                                                      ))}</span>
                                                </div>
                                          </div>
                                    </div>
                                    <div className='contenedor-habilidad'>
                                          <div className='stats-izquierda'>
                                                <div className='habilidad'>
                                                      <span className='nombre-habilidad flex'>{habilidad.nombre}</span>
                                                      <span className='info-habilidad flex'>{habilidad.descripcion}</span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div className='stats'>
                                    <div className='pepe'>
                                          <div className='vida flex'>
                                                <span className='clave'>Vida</span>
                                                <span className='valor'>{stats.vida}</span>
                                          </div>
                                          <div className='ataque flex'>
                                                <span className='clave'>Ataque</span>
                                                <span className='valor'>{stats.ataque}</span>
                                          </div>
                                          <div className='defensa flex'>
                                                <span className='clave'>Defensa</span>
                                                <span className='valor'>{stats.defensa}</span>
                                          </div>
                                          <div className='atq_especial flex'>
                                                <span className='clave'>Atque especial</span>
                                                <span className='valor'>{stats.atq_especial}</span>
                                          </div>
                                          <div className='def_especial flex'>
                                                <span className='clave'>Defensa especial</span>
                                                <span className='valor'>{stats.def_especial}</span>
                                          </div>
                                          <div className='velocidad flex'>
                                                <span className='clave'>Velocidad</span>
                                                <span className='valor'>{stats.velocidad}</span>
                                          </div>
                                    </div>
                              </div>
                  </div>}
                  {pokeball1 === false && 
                        <div className='contenedor-stats pokeball' onMouseEnter={pokeball1True}></div>
                  }
                  {pokeball2 ===true &&
                        <div onMouseLeave={pokeball2False} className='contenedor-movimientos'>
                              <div className='pokemon'>
                                    <img src={imagen} alt={datos_pokemon.name} />
                              </div>
                              <div className='movimientos'>
                                    {movimientos.map((mov)=>(
                                          <div key={mov.name} className='movimiento'>
                                                <span className='nombre-movimiento'>{mov.name}</span>
                                                <span className='pp-movimiento'>{mov.pp} PP</span>
                                                <span className='tipo-movimiento'>{obtenerTipo(mov.type.name)}</span>
                                          </div>))
                                    }
                              </div>
                        </div>
                  }
                  {pokeball2 === false && 
                        <div className='contenedor-movimientos pokeball' onMouseEnter={pokeball2True}></div>
                  }
            </div>

      </>
      }
}

export default Detalle;