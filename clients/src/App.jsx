import React, { useContext } from 'react'
import {useHistory} from 'react-router';
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Chat from './pages/Chat/Chat'
import Error from './pages/Error/Error';
import { AuthContext } from './Context/AuthContext';



function App() {
  const {user:currentUser, isFetching, error, dispatch}= useContext(AuthContext);
  const history=useHistory();

  return (
    <Router>
      <Switch>
          <Route path="/" exact > {currentUser? <Home /> : <Register />}</Route>
          <Route path="/profile/:username" exact > <Profile /> </Route>
          <Route path="/login" exact >{currentUser? <Home /> : <Login /> }</Route>
          <Route path="/register" exact > {currentUser? <Home /> : <Register />}</Route>
          <Route path="/chat" exact > {currentUser? <Chat /> : <Register />}</Route>
          <Route path="/error" exact > <Error/> </Route>
      </Switch>
    </Router>
  )
}

export default App;
