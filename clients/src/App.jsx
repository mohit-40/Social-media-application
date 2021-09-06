import React from 'react'
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home/Home'

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
