const initialState = {
  borrowData: [],
  borrowById: [],
  borrowStat: [],
  request: [],

  isLoading: false,
  isFulfilled: false,
  isRejected: false
}
const borrow = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BORROW_REQUEST_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case "GET_BORROW_REQUEST_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "GET_BORROW_REQUEST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        request: action.payload.data.values
      }
    case "CONFIRM_BORROW_REQUEST_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case "CONFIRM_BORROW_REQUEST_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "CONFIRM_BORROW_REQUEST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true
      }
    case "GET_BORROW_IDBOOK_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case "GET_BORROW_IDBOOK_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "GET_BORROW_IDBOOK_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        borrowById: action.payload.data.values
      }
    case "GET_BORROW_STATUS_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false
      }
    case "GET_BORROW_STATUS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "GET_BORROW_STATUS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        borrowStat: action.payload.data.values
      }
    case "BORROW_BOOK_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case "BORROW_BOOK_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "BORROW_BOOK_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true
      }
    case "RETURN_BOOK_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case "RETURN_BOOK_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "RETURN_BOOK_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true
      }
    default:
      return state
  }
}

export default borrow
