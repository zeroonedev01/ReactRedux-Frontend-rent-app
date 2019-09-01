import axios from "axios"

export const login = data => {
  return {
    type: "LOGIN",
    payload: axios({
      method: "post",
      url: `https://afternoon-coast-91761.herokuapp.com/rentapp/users/signin`,
      data: data
    })
      .then()
      .catch(err => {
        console.log("gagal nk\n" + err)
      })
  }
}

export const register = data => {
  return {
    type: "REGISTER",
    payload: axios({
      method: "post",
      url: `https://afternoon-coast-91761.herokuapp.com/rentapp/users/signup`,
      data: data
    })
      .then()
      .catch(err => {
        console.log("gagal nk\n" + err)
      })
  }
}
