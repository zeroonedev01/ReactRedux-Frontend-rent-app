const initialState = {
  bookList: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
}

const book = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOOK_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case "GET_BOOK_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "GET_BOOK_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        bookList: action.payload.data.values
      }
    case "GET_BOOK_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case "GET_BOOK_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "GET_BOOK_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        bookList: action.payload.data.values
      }
    case "SEARCH_BOOK_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case "SEARCH_BOOK_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "SEARCH_BOOK_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        bookList: action.payload.data.values
      }
    case "ADD_BOOK_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case "ADD_BOOK_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "ADD_BOOK_FULFILLED":
      state.bookList.unshift(action.payload.data.values)
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        bookList: state.bookList
      }
    case "DELETE_BOOK_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case "DELETE_BOOK_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "DELETE_BOOK_FULFILLED":
      const dataAfterDelete = state.bookList.filter(
        book => book.id !== action.payload.data.values.id
      )
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        bookList: dataAfterDelete
      }
    case "EDIT_BOOK_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case "EDIT_BOOK_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "EDIT_BOOK_FULFILLED":
      const dataAfterEdit = state.bookList.map(book => {
        if (book.id === action.payload.data.values.id) {
          return action.payload.data.values
        }
        return book
      })
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        bookList: dataAfterEdit
      }
    default:
      return state
  }
}

export default book
