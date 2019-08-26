import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import Landing from "./pages/Landing"
// import Card2 from "./components/Card2"
import Detail from "./pages/Detail"

// import Home from "./pages/Home"
const App = () => (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  </div>
)

export default App
