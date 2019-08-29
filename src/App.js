import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./Publics/store"

import Login from "./pages/Login"
import Explore from "./pages/Explore"
import Register from "./pages/Register"
import Landing from "./pages/Landing"
import Detail from "./pages/Detail"
import Logout from "./pages/Logout"
const App = () => (
  <div>
    <Router>
      <Provider store={store}>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/explore" component={Explore} />
          <Route path="/landing" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path={"/book/:idBook"} component={Detail} />
          {/* <Redirect to="/login" /> */}
        </div>
      </Provider>
    </Router>
  </div>
)

export default App
