import axios from "axios"

export const getBook = () => {
  return {
    type: "GET_BOOK",
    payload: axios.get(
      `http://localhost:3020/rentapp/books?sort=datereleased:desc`
    )
  }
}
export const searchBook = e => {
  return {
    type: "SEARCH_BOOK",
    payload: axios.get(`http://localhost:3020/rentapp/books`, {
      params: {
        search: e
      }
    })
  }
}
export const getBookById = id => {
  return {
    type: "GET_BOOK_ID",
    payload: axios.get(`http://localhost:3020/rentapp/books/${id}`)
  }
}
export const addBook = (data, token) => {
  return {
    type: "ADD_BOOK",
    payload: axios({
      method: "post",
      url: `http://localhost:3020/rentapp/books`,
      data: data,
      headers: {
        "x-access-token": `${token}`
      }
    })
      .then()
      .catch(err => {
        console.log(err + "\ngagal donk")
      })
  }
}
export const editBook = (id, data, token) => {
  return {
    type: "EDIT_BOOK",
    payload: axios({
      method: "patch",
      url: `http://localhost:3020/rentapp/books/${id}`,
      data: data,
      headers: {
        "x-access-token": `${token}`
      }
    })
      .then()
      .catch(err => {
        console.log(err + "\ngagal donk")
      })
  }
}
export const deleteBook = (id, token) => {
  return {
    type: "DELETE_BOOK",
    payload: axios({
      method: "delete",
      url: `http://localhost:3020/rentapp/books/${id}`,
      headers: {
        "x-access-token": `${token}`
      }
    })
      .then()
      .catch(err => {
        console.log(err + "\nGAGAL DONK")
      })
  }
}
