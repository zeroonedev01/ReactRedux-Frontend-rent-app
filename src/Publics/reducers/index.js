import { combineReducers } from "redux"

import book from "./book"
import genre from "./genre"
import auth from "./auth"
import borrow from "./borrow"

const appReducer = combineReducers({
  book,
  genre,
  auth,
  borrow
})

export default appReducer
