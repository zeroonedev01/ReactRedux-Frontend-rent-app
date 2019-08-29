import React, { Component } from "react"
import { Link } from "react-router-dom"

class Logout extends Component {
  constructor(props) {
    super(props)
    localStorage.removeItem("token")
  }
  render() {
    return (
      <div>
        <h2>Sudah logout </h2>
        <Link to="/">Login Agaoin</Link>
      </div>
    )
  }
}
export default Logout
