import { useState, useEffect } from 'react'
import Home from './Components/home'
import Exercise from './Components/exercise'
import User from './Components/user'
import SeConnecter from './Components/seconnecter'
import EditExercise from './Components/edit-exercise'
import Three from './Components/three'

import './App.css';
import axios from "axios";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";

function App() {
  

  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState(localStorage.getItem('emailInLocalStorage') || '')
  const [name, setName] = useState('')
  const [password, setPassword] = useState(localStorage.getItem('emailInLocalStorage') || '')

  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if(window.localStorage.getItem('emailInLocalStorage') !==null){
      setLogged(true)
    }
  }, [])

  function resetAccount (e) {
    setEmail('')
    setPassword('')
    setLogged(false)
    localStorage.clear();
  }

  function changeEmail(e){
    localStorage.setItem('emailInLocalStorage', e.target.value);
    setEmail(e.target.value);
  }
  function changeName(e){
    setName(e.target.value);
  }
  function changePassword(e){
    localStorage.setItem('passwordInLocalStorage', e.target.value);
    setPassword(e.target.value);
  }

    const submit = async () => {
    console.log(password, email);
    setIsLoading(true)
    await axios.post(`http://localhost:3000/user/login`, {email: email, password: password})
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.token)
      setLogged(true)
      setIsLoading(false)
    });
  }

  function create(){
    axios.post(`http://localhost:3000/user/signup`, {email: email, name: name, password: password})
    .then((response)=> {
    })
  }

  function Box() {
    const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
    return (
      <mesh
        onClick={() => {
          api.velocity.set(0, 2, 0);
        }}
        ref={ref}
        position={[0, 2, 0]}
      >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="hotpink" />
      </mesh>
    );
  }
  
  function Plane() {
    const [ref] = usePlane(() => ({
      rotation: [-Math.PI / 2, 0, 0],
    }));
    return (
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[80, 80]} />
        <meshLambertMaterial attach="material" color="lightblue" />
      </mesh>
    );
  }

  if(logged===false) {
    return(
      <div className="App container" style={{width:'30%', marginTop: '5em'}}>
        {logged ? <h2 className="text-info">Connecté !</h2>: <h2 className="text-danger">Pas connecté</h2>}

        <br/>

        <SeConnecter changeEmail={changeEmail} changePassword={changePassword} submit={submit}/>

        <br/>
        <br/>

        <div className="border rounded p-3">
          {/* Créer son compte */}
          <h2>Créer son compte</h2>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">@</span>
            <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" onChange={changeEmail}/>
          </div>
          <br/>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">@</span>
            <input type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="addon-wrapping" onChange={changeName}/>
          </div>
          <br/>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">...</span>
            <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={changePassword}/>
          </div>
          <br/>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={create}>Créer son compte</button>
        </div>

      </div>
      
    )
  
  } else if(isLoading) {
    return(
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  } else {

  return (
    <div className="App">
      <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
          <a className="navbar-brand" href="/" style={{marginLeft: '15px'}}>NodeJS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Liste d'exercices</Link>
              </li>
              <li className="nav-item">
                <Link to="/exercise" className="nav-link">Créer son exercice</Link>
              </li>
              {/*
              <li className="nav-item">
                <Link to="/three" className="nav-link">Three.js</Link>
              </li>
              */}
            </ul>
          </div>
        </nav>

        <br/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div className="container">
              <Switch>
                <Route path="/exercise">
                  <Exercise />
                </Route>
                <Route path="/user">
                  <User />
                </Route>
                <Route path="/edite/:id">
                  <EditExercise />
                </Route>
                <Route path="/">
                  <Home email={email} password={password} resetAccount={resetAccount}/>
                </Route>
                <Route path="/three">
                  <Three />
                </Route>
              </Switch>
            </div>
        
      </div>
      
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Physics>
          <Box />
          <Plane />
        </Physics>
      </Canvas>

    </Router>
    </div>
  );
}
}

export default App;
