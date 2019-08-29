const init = {
  genre: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false
}

const genre = (state = init, action) => {
  switch (action.type) {
    case "GET_GENRE_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case "GET_GENRE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case "GET_GENRE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        genre: action.payload.data.values
      }
    default:
      return state
  }
}
export default genre
