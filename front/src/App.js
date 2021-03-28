import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

          {/* Home */}
          <Route exact path="/">
            <Home token={token} />
          </Route>

          {/* Login */}
          <Route exact path="/login">
            < Login token={token} />
          </Route>

          {/* Register */}
          <Route exact path="/register">
            <Register token={token} />
          </Route>


          {/* User */}
          <Route exact path="/profile">
            <Profile token={token} />
          </Route>

          <Route exact path="/events">
            <Events token={token} />
          </Route>

        </Switch>

        {/* We show footer if url pathname not Registration page */}
        {!location.match(/login/) && !location.match(/register/) &&
          <Footer token={token} />
        }

      </Router>
    </div >
  );
}
