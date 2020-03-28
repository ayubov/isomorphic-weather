import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';

import Head from './Head';

const LoadableHome = Loadable({
  loader: () => import('./home/Home'),
  loading: () => <div>Loading...</div>
});

const LoadableAbout = Loadable({
  loader: () => import('./about/About'),
  loading: () => <div>Loading...</div>
});

const App = () => (
  <div className="app">
    <Head />

    <nav aria-label="main navigation">
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink exact to="/about" activeClassName="active">
        About
      </NavLink>
    </nav>

    <main className="main">
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/about" component={LoadableAbout} />
      </Switch>
    </main>

    <footer>
      Made by&nbsp;<a href="https://ayubov.com" target="_blank">ayubov.com</a>
    </footer>
  </div>
);

export default App;
