import { Link } from 'react-router-dom';
import './navegacion.css'

function Navegacion(){
      

      return <>
            <div className='contenedor-navegacion'>
                  <div className='navegacion'>
                        <div className='contenedor-logo'>
                              <Link to="landingpage"><img id='logo' src='logo.png' alt='logo'/></Link>
                        </div>
                        <div>
                              <Link className='link' to="juego">juego</Link>
                              <Link className='link' to="pokemons">pokemons</Link>
                              <Link className='link' to="registro">registro/deslogueo</Link>
                        </div>
                  </div>
            </div>
      </>
}

export default Navegacion;