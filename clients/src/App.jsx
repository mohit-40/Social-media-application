import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import Chat from './pages/Chat/Chat';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import FriendPage from "./pages/FriendPage/FriendPage"
import UpdateInfo from "./pages/UpdateInfo/UpdateInfo"
import { useSelector } from 'react-redux'

function App() {
  const userState = useSelector(state => state.user)
  const currentUser = userState.currentUser;

  return (
    <Router>
      <Switch>
          <Route path="/" exact > {currentUser? <Home /> : <Register />}</Route>
          <Route path="/profile/:username" exact > <Profile /> </Route>
          <Route path="/login" exact >{currentUser? <Home /> : <Login /> }</Route>
          <Route path="/register" exact > {currentUser? <Home /> : <Register />}</Route>
          <Route path="/chat" exact > {currentUser? <Chat /> : <Register />}</Route>
          <Route path="/friendPage" exact > {currentUser? <FriendPage /> : <Register />}</Route>
          <Route path="/UpdateInfo" exact > {currentUser? <UpdateInfo /> : <Register />}</Route>
          <Route path="/error" exact > <Error/> </Route>
      </Switch>
    </Router>
  )
}

export default App;
