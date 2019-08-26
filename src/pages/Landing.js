import React, { Component } from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Header from "../components/common/Header"
import Carausel from "../components/carousel/Carousel"
import Books from "../components/BookCard"
import Books1 from "../components/Card2"

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

class Landing extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {<Header />}
        {<Carausel />}
        {<Books />}
      </MuiThemeProvider>
    )
  }
}

export default Landing
