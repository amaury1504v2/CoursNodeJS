import { useState, useEffect } from 'react'
import Home from './Components/home'
import Exercise from './Components/exercise'
import User from './Components/user'
import SeConnecter from './Components/seconnecter'
import EditExercise from './Components/edit-exercise'
import Three from "./Components/three";

import './App.css';
import axios from "axios";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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

  if(logged===false) {
    return(
      <div className="App container">
      {logged ? <p>Connecté !</p>: <p>Pas connecté</p>}     

      <h1>Exercices</h1>

      <br/>

      <Router>
        <Link to="/seconnecter">Se Connecter</Link>

        <Switch>
          <Route path="/seconnecter">
            <SeConnecter changeEmail={changeEmail} changePassword={changePassword} submit={submit}/>
          </Route>
        </Switch>
      
      <br/>
      <br/>
      </Router>
      

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
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <a className="navbar-brand" href="#" style={{marginLeft: '15px'}}>Like minded</a>
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
            <li className="nav-item">
              <Link to="/three" className="nav-link">Three.js</Link>
            </li>
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
    </Router>
    </div>
  );
}
}

export default App;
