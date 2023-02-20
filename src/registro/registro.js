import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { Route } from "react-router-dom";
import { auth } from "../firebase";
import './registro.css'

var usuario_activo;
function Registro() {
  const provider = new GoogleAuthProvider();

  var [email, setEmail] = useState('');
  var [contraseña, setContraseña] = useState('');
  var [email_inicio, setEmailInicio] = useState('');
  var [contraseña_inicio, setContraseñaInicio] = useState('');
  var [logueado, setLogueado] = useState(false);


  function registrar() {
    createUserWithEmailAndPassword(auth, email, contraseña)
  }

  function iniciar() {
    signInWithEmailAndPassword(auth, email_inicio, contraseña_inicio)
      .then((userCredential) => {
        usuario_activo = userCredential.user
        setEmailInicio(email_inicio = '')
        setContraseñaInicio(contraseña_inicio = '')
        Route.push(["/"])
      })
      .catch((error) => {
      });
  }

  function iniciarGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        usuario_activo = result.user;
      }).catch((error) => {
      });
  }

  function desloguear() {
    signOut(auth)
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLogueado(true);
    } else {
      setLogueado(false);
    }
  });


  return <>
    {logueado == false && <div className="contenendor-registro">
      <div>
        <input type="email" placeholder="correo" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} />
        <button className="boton button" onClick={registrar}>Registrase</button>
      </div>
      <div>
        <input type="email" placeholder="correo" value={email_inicio} onChange={e => setEmailInicio(e.target.value)} />
        <input type="password" placeholder="contraseña" value={contraseña_inicio} onChange={e => setContraseñaInicio(e.target.value)} />
        <button className="boton button" onClick={iniciar}>Iniciar</button>
        <button className="boton button" onClick={iniciarGoogle}>Google</button>
      </div>

    </div>}
    {logueado == true &&
      <div className="contenendor-registro">
        <button className="boton button" onClick={desloguear}>Desloguear</button>
      </div>
    }
  </>
}

export default Registro
export { usuario_activo }
