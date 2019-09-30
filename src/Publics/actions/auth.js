import axios from "axios"

export const login = data => {
  return {
    type: "LOGIN",
    payload: axios({
      method: "post",
      url: `http://localhost:3020/rentapp/users/signin`,
      data: data
    })
  }
}

export const register = data => {
  return {
    type: "REGISTER",
    payload: axios({
      method: "post",
      url: `http://localhost:3020/rentapp/users/signup`,
      data: data
    })
      .then()
      .catch(err => {
        console.log("gagal nk\n" + err)
      })
  }
}
