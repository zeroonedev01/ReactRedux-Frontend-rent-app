import axios from "axios"
import jwtDecode from "jwt-decode"

// instantiate axios
const jwt = axios.create()

jwt.getToken = function() {
  return localStorage.getItem("token")
}

jwt.setToken = function(token) {
  localStorage.setItem("token", token)
  return token
}

jwt.getCurrentUser = function() {
  const token = this.getToken()
  if (token) return jwtDecode(token)
  return null
}

jwt.logOut = function() {
  localStorage.removeItem("token")
  delete this.defaults.headers.common.token
  return true
}

jwt.defaults.headers.common.token = jwt.getToken()
export default jwt
