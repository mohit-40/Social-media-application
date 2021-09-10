import React, { useContext } from 'react'
import {useHistory} from 'react-router';
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Chat from './pages/Chat/Chat'
import { AuthContext } from './Context/AuthContext';




function App() {
  const {user, isFetching, error, dispatch}= useContext(AuthContext);
  const history=useHistory();

  return (
    <Router>
      <Switch>
          <Route path="/" exact > {user? <Home /> : <Register />}</Route>
          <Route path="/profile/:username" exact > <Profile /> </Route>
          <Route path="/login" exact >{user? <Home /> : <Login /> }</Route>
          <Route path="/register" exact > {user? <Home /> : <Register />}</Route>
          <Route path="/chat" exact > {user? <Chat /> : <Register />}</Route>
      </Switch>
    </Router>
  )
}

export default App;
