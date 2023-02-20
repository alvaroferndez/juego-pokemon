import './landingpage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
      return <>
            <div className='contenedor-landingpage'>
                  <div className='contenedor-imagen-pokemon'>
                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png" alt="" />
                  </div>
                  <h1 className='titulo'>Descubre todos los Pokemons</h1>
                  <Link to="/cuerpo" className='empezar'><button className='boton' type='button'>Empezar</button></Link>
                  <Link className='info' to="cuerpo/detalle/mew  ">
                        <div className='contenedor-info'>
                              <div>
                                    <h4>Mew</h4>
                                    <p>La forma de Mew es derivada del gato esfinge, ya que es de aspecto felino y color rosado. Además, se dice que este Pokémon sí tiene pelo, solo que a tamaño microscópico, igual que el verdadero animal...</p>
                              </div>
                        </div>
                  </Link>
            </div>
      </>
}

export default LandingPage;