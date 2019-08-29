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

jwt.logIn = function(credentials) {
  return this({
    method: "post",
    url: "http://localhost:3020/rentapp/users/signin",
    data: credentials
  })
    .then(serverResponse => {
      const token = JSON.stringify(serverResponse.data.values.accessToken)
      if (token) {
        this.defaults.headers.common.token = this.setToken(token)
        console.log(jwtDecode(token))
        return jwtDecode(token)
      } else {
        return false
      }
    })
    .catch(err => {
      console.error(err)
      alert("Fail!, Check username and password")
    })
}

//login SIgnUP
jwt.signUp = function(userInfo) {
  return this({
    method: "post",
    url: "http://localhost:3020/rentapp/users/signup",
    data: userInfo
  })
    .then(serverResponse => {
      const token = serverResponse.data.token
      if (token) {
        this.defaults.headers.common.token = this.setToken(token)
        return jwtDecode(token)
      } else {
        return false
      }
    })
    .catch(err => {
      console.error(err)
      alert("Fail! Sign UP")
    })
}

jwt.logOut = function() {
  localStorage.removeItem("token")
  delete this.defaults.headers.common.token
  return true
}

jwt.defaults.headers.common.token = jwt.getToken()
export default jwt
