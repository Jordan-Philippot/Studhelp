import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';

// All stylesheets
import './styles/App.scss';
// Gsap Animations
import gsap, { CSSPlugin } from 'gsap';
// Axios 
import { checkUser } from './services/user'

// Loader 
import Loader from './components/loader/Loader';
// Sections
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
// Home
import Home from "./components/home/Home.js";
// About Us
import AboutUs from "./components/aboutus/AboutUs.js";
// Registration
import Login from "./components/registration/Login";
import Register from "./components/registration/Register";
// Events
import Events from "./components/events/Events";
import OneEvent from "./components/events/OneEvent";
// Associations
import Associations from "./components/associations/Associations";
import OneAssociation from './components/associations/OneAssociation';
// User 
import Profile from "./components/user/profile/Profile";
import MyEvents from "./components/myevents/MyEvents";
import NewEvent from "./components/myevents/NewEvent";
import MyOneEvent from "./components/myevents/MyOneEvent";
import UpdateEvent from "./components/myevents/UpdateEvent";

import MyParticipations from "./components/participations/MyParticipations";

// Invitations
import NewInvitations from "./components/invitations/NewInvitation";
import MyInvitations from "./components/invitations/MyInvitations";
import MyInvitation from "./components/invitations/MyInvitation";

// Tchat StreamChat
import Chat from "./components/chat/Chat";

// Not Found 404
import NotFound from './components/NotFound'

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

  // If client area = redirect to login page
  useEffect(() => {
    if (location.match(/espace-client/)) {
      if (token.user === "" || token.user === false) {
        return window.location.href = "/login"
      }
    } else if (location.match(/connexion/) || location.match(/inscription/)) {
      if (token.user) {
        return window.location.href = "/"
      }
    }
  }, [location, token])

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

            {/* About Us */}
            <Route exact path="/about-us">
              <Helmet title="Stud'help | À propos" />
              <AboutUs />
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


            {/* Events */}
            <Route exact path="/evenements">
              <Helmet title="Stud'help | Évènements" />
              <Events token={token} />
            </Route>

            <Route exact path="/evenement/:id">
              <Helmet title="Stud'help | Évènement" />
              <OneEvent token={token} />
            </Route>


            {/* Associations */}
            <Route exact path="/associations">
              <Helmet title="Stud'help | Associations" />
              <Associations />
            </Route>

            <Route exact path="/association/:id">
              <Helmet title="Stud'help | Association" />
              <OneAssociation />
            </Route>


            {/****************** Espace Client *********************/}
            {/* User */}
            <Route exact path="/espace-client/profil">
              <Helmet title="Stud'help | Profil" />
              <Profile />
            </Route>


            {/* User Events */}
            <Route exact path="/espace-client/mes-evenements">
              <Helmet title="Stud'help | Mes évènements" />
              <MyEvents />
            </Route>

            <Route exact path="/espace-client/mon-evenement/:id">
              <Helmet title="Stud'help | Mon évènement" />
              <MyOneEvent />
            </Route>


            <Route exact path="/espace-client/nouvel-evenement">
              <Helmet title="Stud'help | Mon Nouvel évènement" />
              <NewEvent />
            </Route>

            <Route exact path="/espace-client/modifier-evenement/:id">
              <Helmet title="Stud'help | Modifier mon évènement" />
              <UpdateEvent />
            </Route>

            {/* User Participate */}
            <Route exact path="/espace-client/mes-participations">
              <Helmet title="Stud'help | Mes participations" />
              <MyParticipations />
            </Route>

            {/* User Invitations */}
            <Route exact path="/espace-client/nouvel-invitation/:id">
              <Helmet title="Stud'help | Envoyer une invitation" />
              <NewInvitations />
            </Route>

            <Route exact path="/espace-client/mes-invitations">
              <Helmet title="Stud'help | Mes invitations" />
              <MyInvitations />
            </Route>

            <Route exact path="/espace-client/mon-invitation/:id">
              <Helmet title="Stud'help | Mon invitation" />
              <MyInvitation />
            </Route>

            <Route exact path="/espace-client/chat/:conversation">
              <Helmet title="Stud'help | Chat" />
              <Chat token={token}/>
            </Route>

          </HelmetProvider>

          {/* Not Found 404 */}
          <Route component={NotFound} />

        </Switch>

        {/* We show footer if url pathname not Registration page */}
        {/* {!location.match(/connexion/) && !location.match(/inscription/) && */}
        <Footer token={token} />
        {/* } */}

      </div >
    </Router>
  );
}
