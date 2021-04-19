import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';

// All stylesheets
import './styles/App.scss';
// Axios 
import { checkUser } from './services/user'
// Gsap
import gsap, { CSSPlugin } from 'gsap';
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
// Associations
import Associations from "./components/associations/Associations";


// User 
import Profile from "./components/user/profile/Profile";

export default function App() {
  const [location, setLocation] = useState('')
  const [token, setToken] = useState([])

  gsap.registerPlugin(CSSPlugin);

  // check if user is already logged
  useEffect(() => {
    checkUser(setToken);
  }, []);

  // Listener url pathname and Check token 
  useEffect(() => {
    setLocation(window.location.pathname)
  }, [location]);

  return (
    <div className="App">
      <Router>

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

            {/* Associations */}
            <Route exact path="/associations">
              <Helmet title="Stud'help | Associations" />
              <Associations token={token} />
            </Route>

          </HelmetProvider>
        </Switch>

        {/* We show footer if url pathname not Registration page */}
        {!location.match(/connexion/) && !location.match(/inscription/) &&
          <Footer token={token} />
        }

      </Router>
    </div >
  );
}
