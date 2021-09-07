import React from 'react'
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  )
}

export default App;
