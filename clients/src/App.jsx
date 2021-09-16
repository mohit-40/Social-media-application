import React, { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from './Context/AuthContext';
import Chat from './pages/Chat/Chat';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import FriendPage from "./pages/FriendPage/FriendPage"
import { io } from "socket.io-client";

function App() {
	// const socket = useRef();
  const {user:currentUser }= useContext(AuthContext);
  
  // useEffect(() => {
  //     if(currentUser){
  //       socket.current = io("ws://localhost:8900");
  //     }
  //   }, []);


  return (
    <Router>
      <Switch>
          <Route path="/" exact > {currentUser? <Home /> : <Register />}</Route>
          <Route path="/profile/:username" exact > <Profile /> </Route>
          <Route path="/login" exact >{currentUser? <Home /> : <Login /> }</Route>
          <Route path="/register" exact > {currentUser? <Home /> : <Register />}</Route>
          <Route path="/chat" exact > {currentUser? <Chat /> : <Register />}</Route>
          <Route path="/friendPage" exact > {currentUser? <FriendPage /> : <Register />}</Route>
          <Route path="/error" exact > <Error/> </Route>
      </Switch>
    </Router>
  )
}

export default App;
