import axios from "axios"

export const getGenre = () => {
  return {
    type: "GET_GENRE",
    payload: axios
      .get(
        `http://afternoon-coast-91761.herokuapp.com/rentapp/genres?page=1&limit=100&sort=name:asc`
      )
      .then()
      .catch(err => {
        console.log(err + "Error donk")
      })
  }
}
