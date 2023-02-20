import { collection, updateDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { db, } from '../firebase';
import { useState,useEffect } from "react";
import './juego.css'
import { usuario_activo } from '../registro/registro';
import { Link } from 'react-router-dom';

function Juego() {

  var [puntuacion, setPuntuacion] = useState(0);
  var [puntuacion_usuario, setPuntuacionUsuario] = useState(0);
  var [continuar, setContinuar] = useState('');
  var [pokemon1, setPokemon1] = useState('');
  var [pokemon2, setPokemon2] = useState('');
  var [imagen_pokemon1, setimagenPokemon1] = useState('');
  var [imagen_pokemon2, setimagenPokemon2] = useState('');
  var [lista_pokemon, setListaPokemon] = useState([]);
  var [todos, setTodos] = useState([]);

  useEffect(() => obtenerDatos(), [])

  function obtenerDatos() { 
    getDocs(collection(db, "puntuaciones"))
    .then((querySnapshot) => {
      var lista_datos = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setTodos(todos = lista_datos);
    })
  }
  

  function guardarPuntuacion() {
    var esta = false;
    for (let element of todos) {
      if (element.usuario == usuario_activo.uid) {
        esta = true;
        setPuntuacionUsuario(puntuacion_usuario = element.puntuacion)
      }
    }
    if (esta && puntuacion_usuario < puntuacion) {
      updateDoc(doc(db, "puntuaciones", usuario_activo.uid), {
        puntuacion: puntuacion,
      }).then(() => {
        setPuntuacionUsuario(puntuacion_usuario = puntuacion)
        setPuntuacion(puntuacion = 0)
        obtenerDatos();
      });
    } else if(!esta){
      setDoc(doc(db, "puntuaciones", usuario_activo.uid), {
        usuario: usuario_activo.uid,
        puntuacion: puntuacion,
      }).then(() => {
        setPuntuacionUsuario(puntuacion_usuario = puntuacion)
        setPuntuacion(puntuacion = 0)
        obtenerDatos();
      })
    }else{
      setPuntuacion(puntuacion = 0)
      
    }
  }

  function iniciar() {
    setContinuar(continuar = true)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((datos) => datos.json())
      .then((datos) => {
        setListaPokemon(lista_pokemon = datos.results);
        obtenerPrimerosPokemons()
      })

  }


  function obtenerPrimerosPokemons() {
    var numeros = [];
    while (numeros.length < 2) {
      var numero = Math.floor(Math.random() * lista_pokemon.length)
      // eslint-disable-next-line no-loop-func
      if (numeros.find((element) => element === numero) || numero === 0) {
        continue
      } else {
        numeros.push(numero)
      }
    }

    obtenerPokemon(lista_pokemon[numeros[0]].url, 0)
    obtenerPokemon(lista_pokemon[numeros[1]].url, 1)
  }


  function menor() {
    if (pokemon1.weight <= pokemon2.weight) {
      setContinuar(continuar = false)
      guardarPuntuacion()
    } else if (pokemon1.weight >= pokemon2.weight) {
      acutalizarPokemons()
    }
  }

  function mayor() {
    if (pokemon1.weight >= pokemon2.weight) {
      setContinuar(continuar = false)
      guardarPuntuacion()
    } else if (pokemon1.weight <= pokemon2.weight) {
      acutalizarPokemons()
    }
  }

  function acutalizarPokemons() {
    setPuntuacion(puntuacion += 1)
    setPokemon1(pokemon1 = pokemon2)
    setimagenPokemon1(imagen_pokemon1 = imagen_pokemon2)
    var numero = 0;
    while (numero < 1) {
      var num = Math.floor(Math.random() * lista_pokemon.length)
      // eslint-disable-next-line no-loop-func
      if (num === 0 || num === pokemon1.id) {
        continue
      } else {
        numero = num
      }
    }
    obtenerPokemon(lista_pokemon[numero].url, 1)
  }

  function obtenerPokemon(peticion, tipo) {
    fetch(peticion)
      .then((datos) => datos.json())
      .then((datos) => {
        if (tipo === 0) {
          setPokemon1(pokemon1 = datos)
          if (pokemon1.sprites.other.home.front_default) {
            setimagenPokemon1(imagen_pokemon1 = pokemon1.sprites.other.home.front_default)
          } else {
            setimagenPokemon1(imagen_pokemon1 = pokemon1.sprites.front_default)
          }
        } else if (tipo === 1) {
          setPokemon2(pokemon2 = datos)
          if (pokemon2.sprites.other.home.front_default) {
            setimagenPokemon2(imagen_pokemon2 = pokemon2.sprites.other.home.front_default)
          } else {
            setimagenPokemon2(imagen_pokemon2 = pokemon2.sprites.front_default)
          }
        }
      })
  }

  return <>
    <div className="contenedor-juego">
      {continuar === true &&
        <div className="contenedor-pokemons-juego">
          <div className="imagen-1 imagen-juego">
            <h1>{pokemon1.name}</h1>
            <p>{pokemon1.weight / 10} kg</p>
            <p>pesa</p>
            <img src={imagen_pokemon1} alt="" />
          </div>
          <div className="imagen-2 imagen-juego">
            <h1>{pokemon2.name}</h1>
            <button onClick={menor}>Menor</button>
            <button onClick={mayor}>Mayor</button>
            <img src={imagen_pokemon2} alt="" />
          </div>
        </div>}
      <div className="estadisticas">
        <button onClick={iniciar} className="boton">Nuevo Juego</button>
        {usuario_activo !== undefined && 
          <div className="contenendor-puntuacion">
            <p>Puntuacion: {puntuacion}</p>
            <p>Mayor Puntuacion: {puntuacion_usuario}</p>
          </div>
        }
        {usuario_activo === undefined && 
          <Link className='link' to="/registro"><p>Inicia sesion para guardar tus resultados</p></Link>
          
        }
      </div>
    </div>
  </>
}

export default Juego;