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
import { useSelector } from 'react-redux'
import {userRequest} from "./requestMethod"
import axios from "axios"
import jwtDecode from 'jwt-decode'


function App() {
  const userState = useSelector(state => state.user)
  const currentUser = userState.currentUser;

  const refreshToken = async () => {
    try {
      const REFRESH_TOKEN = localStorage.getItem("refreshToken")
      const res = await axios.post("/auth/refresh/" + currentUser._id, { refreshToken: REFRESH_TOKEN });
      localStorage.setItem("accessToken", res.data.accessToken)
      console.log("accesstoken updated")
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  
  userRequest.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const ACCESS_TOKEN = localStorage.getItem("accessToken")
      const decodedToken = jwtDecode(ACCESS_TOKEN);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <Switch>
          <Route path="/" exact > {currentUser? <Home /> : <Login />}</Route>
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
