import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import {CookiesProvider} from 'react-cookie'

//pages
import ContentPage from './pages/contentPage';
import Concept from './pages/concept-testing';
import LandingPage from './pages/landingPage';
import ContainerViewPage from './pages/containerViewPage';

function App() {
  return (
    <CookiesProvider>
        <Router>
            <div className="App">
                <Switch>
                    <Route path = {"/content"} exact component = {ContentPage}/>
                    <Route path = {"/containers/*"} exact component = {ContainerViewPage}/>
                    <Route path={"/"} exact component = {LandingPage}/>
                </Switch>
            </div>
        </Router>
    </CookiesProvider>
  );
}

export default App;
