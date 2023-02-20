import './App.css';
import Cuerpo from './cuerpo/cuerpo';
import LandingPage from './landingpage/landingpage';
import Navegacion from './navegacion/navegacion';
import Juego from './juego/juego';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detalle from './detalle/detalle';
import Registro from './registro/registro';


function App() {
  return (
    <div className='contenedor'>
      <BrowserRouter>
      <Navegacion/>
        <Routes>
          <Route path='*' element={<LandingPage/>}/>
          <Route path='/' exact element={<LandingPage/>}/>
          <Route path='/landingpage' exact element={<LandingPage/>}/>
          <Route path='/pokemons' exact element={<Cuerpo/>}/>
          <Route path='/registro' exact element={<Registro/>}/>
          <Route path='/pokemons/detalle/:nombre' element={<Detalle/>}/>
          <Route path='/juego/' element={<Juego/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
