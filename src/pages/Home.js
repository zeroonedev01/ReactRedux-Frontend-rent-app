import React, { Component } from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Header from "../components/NavBar"
import Carousel from "../components/carousel/Carousel"
import Books from "../components/bookcard/BookCard"
import { Card } from "@material-ui/core"
import { Redirect } from "react-router-dom"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary: {
      main: "#000000"
    }
  }
})

class Home extends Component {
  state = {
    currentUser: ""
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {<Header />}
        {<Carousel />}
        {<Books />}
      </MuiThemeProvider>
    )
  }
}
export default Home
