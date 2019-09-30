const init = {
  userData: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  errMassage: null
}

const auth = (state = init, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
        isLoggedIn: false
      }
    case "LOGIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
        errMassage: action.payload.response.data.message
      }
    case "LOGIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isLoggedIn: true,
        userData: action.payload.data.values
      }
    case "REGISTER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case "REGISTER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "REGISTER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true
      }
    default:
      return state
  }
}
export default auth
