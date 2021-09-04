import React from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  )
}

export default App;
