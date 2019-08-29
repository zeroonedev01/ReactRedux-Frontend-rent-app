import { combineReducers } from "redux"

import book from "./book"
import genre from "./genre"

const appReducer = combineReducers({
  book,
  genre
})

export default appReducer
