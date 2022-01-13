import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import Chat from './pages/Chat/Chat';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import FriendPage from "./pages/FriendPage/FriendPage";
import UpdateInfo from "./pages/UpdateInfo/UpdateInfo";
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { setSocket } from './redux/exportAllAction';
import "./App.css"

function App() {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user)
  const currentUserId = userState.currentUserId;
  useEffect(()=>{
    if(currentUserId){
      let socket;
      if(process.env.NODE_ENV==="production"){
        socket = io("https://socialifyappsocket.herokuapp.com/");
      }
      else{
        socket= io("http://localhost:8900/")
      }
      socket?.emit("addUser",currentUserId);
      dispatch(setSocket(socket));
    }
  },[dispatch, currentUserId]);
  
  return (
    <Router>
      <Switch>
          <Route path="/" exact > {currentUserId? <Home /> : <Login />}</Route>
          <Route path="/profile/:username" exact > <Profile /> </Route>
          <Route path="/login" exact >{currentUserId? <Home /> : <Login /> }</Route>
          <Route path="/register" exact > {currentUserId? <Home /> : <Register />}</Route>
          <Route path="/chat" exact > {currentUserId? <Chat /> : <Register />}</Route>
          <Route path="/friendPage" exact > {currentUserId? <FriendPage /> : <Register />}</Route>
          <Route path="/updateInfo" exact > {currentUserId? <UpdateInfo /> : <Register />}</Route>
          <Route path="/error" exact > <Error/> </Route>
      </Switch>
    </Router>
  )
}

export default App;
