import axios from "axios"

export const getBorrowId = (id, token) => {
  return {
    type: "GET_BORROW_IDBOOK",
    payload: axios({
      method: "get",
      url: `http://localhost:3020/rentapp/borrows?userid=${id}`,
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
export const getBorrowStatus = (status, id, token) => {
  return {
    type: "GET_BORROW_STATUS",
    payload: axios({
      method: "get",
      url: `http://localhost:3020/rentapp/borrows?bookid='${id}'&status=${status}`,
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
export const borrowBook = (data, token) => {
  return {
    type: "BORROW_BOOK",
    payload: axios({
      method: "post",
      url: `http://localhost:3020/rentapp/borrows`,
      data: data,
      headers: {
        "x-access-token": `${token}`
      }
    })
  }
}
export const returnBook = (id, token) => {
  return {
    type: "RETURN_BOOK",
    payload: axios({
      method: "patch",
      url: `http://localhost:3020/rentapp/borrows/${id}`,
      headers: {
        "x-access-token": `${token}`
      }
    })
  }
}
export const searchTrx = (id, token) => {
  return {
    type: "GET_BORROW_REQUEST",
    payload: axios({
      method: "get",
      url: `http://localhost:3020/rentapp/borrows/borrowall/${id}`,
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
export const confirmBorID = (id, token) => {
  return {
    type: "CONFIRM_BORROW_REQUEST",
    payload: axios({
      method: "patch",
      url: `http://localhost:3020/rentapp/borrows/borrowid/${id}`,
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
