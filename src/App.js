import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./Publics/store"

import Login from "./pages/Login"
import Explore from "./pages/Explore"
import Register from "./pages/Register"
import Landing from "./pages/Landing"
import Detail from "./pages/Detail"
import History from "./pages/History"
import Logout from "./pages/Logout"
const App = () => (
  <div>
    <Router>
      <Provider store={store}>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route path="/explore" component={Explore} />
          <Route path="/history" component={History} />

          <Route exact path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path={"/book/:idBook"} component={Detail} />
          {/* <Redirect to="/login" /> */}
        </div>
      </Provider>
    </Router>
  </div>
)

export default App
