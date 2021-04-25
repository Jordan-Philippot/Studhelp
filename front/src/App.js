import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';

// All stylesheets
import './styles/App.scss';
// Gsap Animations
import gsap, { CSSPlugin } from 'gsap';
// Axios 
import { checkUser } from './services/user'
// Sections
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
// Home
import Home from "./components/home/Home.js";
// Registration
import Login from "./components/registration/Login";
import Register from "./components/registration/Register";
// Events
import Events from "./components/events/Events";
import OneEvent from "./components/events/OneEvent";
import MyEvents from "./components/events/MyEvents";

// Associations
import Associations from "./components/associations/Associations";


// User 
import Profile from "./components/user/profile/Profile";
import OneAssociation from './components/associations/OneAssociation';


// Loader 
import Loader from './components/loader/Loader';

export default function App() {
  const [load, setLoad] = useState(false)
  const [location, setLocation] = useState('')
  const [token, setToken] = useState([])

  // check if user is already logged
  useEffect(() => {
    checkUser(setToken);
  }, []);

  // Listener url pathname and Check token 
  useEffect(() => {
    setLocation(window.location.pathname)
  }, [location]);

  gsap.registerPlugin(CSSPlugin);

  // Animation loader aliz
  useEffect(() => {
    var tl = gsap.timeline({ repeat: 0, yoyo: false });
    if (!load) {
      setLoad(true)
      tl.to('.loader', { css: { display: 'none' } }, 0.);
      tl.to('.App', { css: { display: 'block' } }, 0.5);
    }
  }, [load])

  return (
    <Router>

      <Loader />

      <div className="App">

        <div>
          <div className="drop drop-1"></div>
          <div className="drop drop-2"></div>
          <div className="drop drop-3"></div>
          <div className="drop drop-4"></div>
          <div className="drop drop-5"></div>
        </div>

        <Header token={token} />

        <Switch>
          <HelmetProvider>

            {/* Home */}
            <Route exact path="/">
              <Helmet title="Stud'help | Accueil" />
              <Home token={token} />
            </Route>

            {/* Login */}
            <Route exact path="/connexion">
              <Helmet title="Stud'help | Connexion" />
              <Login token={token} />
            </Route>

            {/* Register */}
            <Route exact path="/inscription">
              <Helmet title="Stud'help | Inscription" />
              <Register token={token} />
            </Route>


            {/* User */}
            <Route exact path="/profil">
              <Helmet title="Stud'help | Profil" />
              <Profile token={token} />
            </Route>

            {/* Events */}
            <Route exact path="/evenements">
              <Helmet title="Stud'help | Évènements" />
              <Events token={token} />
            </Route>

            <Route exact path="/evenement/:id">
              <Helmet title="Stud'help | Évènement" />
              <OneEvent token={token} />
            </Route>

            <Route exact path="/mes_evenements">
              <Helmet title="Stud'help | Mes évènements" />
              <MyEvents token={token} />
            </Route>

            {/* Associations */}
            <Route exact path="/associations">
              <Helmet title="Stud'help | Associations" />
              <Associations token={token} />
            </Route>

            <Route exact path="/association/:id">
              <Helmet title="Stud'help | Association" />
              <OneAssociation token={token} />
            </Route>

          </HelmetProvider>
        </Switch>

        {/* We show footer if url pathname not Registration page */}
        {/* {!location.match(/connexion/) && !location.match(/inscription/) && */}
        <Footer token={token} />
        {/* } */}

      </div >
    </Router>
  );
}
