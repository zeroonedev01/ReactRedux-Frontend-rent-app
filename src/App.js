import React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Landing from "./pages/Landing"
import Detail from "./pages/Detail"
import Logout from "./pages/Logout"
const App = () => (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/landing" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path={"/book/:idBook"} component={Detail} />
        {/* <Redirect to="/login" /> */}
      </div>
    </Router>
  </div>
)

export default App
