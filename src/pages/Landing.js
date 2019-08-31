import React, { Component } from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Header from "../components/NavBar1"
import Carausel from "../components/carousel/Carousel"
import Books from "../components/bookcard/BookList"
import LinearProgress from "@material-ui/core/LinearProgress"
import { connect } from "react-redux"
import check from "../helpers/jwt"
import { Redirect } from "react-router-dom"

import { getBook, searchBook } from "../Publics/actions/book"

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
  constructor(props) {
    super(props)
    this.handlePage = this.handlePage.bind(this)
    this.state = {
      books: [],
      searchField: "",
      sort: "",
      carousel: [],
      filter: "",
      curentUser: check.getCurrentUser(),
      i: 0
    }
  }
  componentDidMount = async () => {
    await this.props.dispatch(getBook())
    const cleanData = this.cleanData(this.props.book)
    console.log(cleanData)
    this.setState({ carousel: cleanData, books: cleanData })
    console.log("getBooks =", this.state.books)
  }
  searchBook = async e => {
    if (e.key === "Enter") {
      console.log(this.state.searchField)
      await this.props.dispatch(searchBook(this.state.searchField))
      const cleanData = this.cleanData(this.props.book)
      console.log("sdsdds121", cleanData)
      this.setState({ books: cleanData })
    }
  }
  handleChange1 = e => {
    // console.log(e.target.value)
    this.setState({ searchField: e.target.value })
  }
  handleSort = e => {
    console.log(e.target.value)
    this.setState({ sort: e.target.value })
  }
  handleFilter = e => {
    console.log(e.target.value)
    this.setState({ filter: e.target.value })
  }
  handlePage = e => {
    this.setState({
      i: e
    })
  }
  cleanData = res => {
    const cleanData = res.bookList.map(book => {
      book.DateReleased = new Date(book.DateReleased)
        .toISOString()
        .split("T")[0]
      if (book.Image === null || book.Image === "") {
        book.Image =
          "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
      }
      return book
    })
    return cleanData
  }
  render() {
    // if (!this.state.curentUser) {
    //   this.props.history.push("/login")
    // }
    console.log("User", this.state.curentUser)
    console.log("Genre", this.state.filter)
    console.log("State", this.state)
    let filterCarousel = this.state.carousel.filter(
      function(item) {
        if (this.count < 9 && item.available === "true") {
          this.count++
          return true
        }
        return false
      },
      { count: 0 }
    )
    let filteredBooks = this.state.books
      .filter(bookFil => {
        if (this.state.filter === "") {
          return bookFil
        }
        return bookFil.genre === this.state.filter
      })
      .sort((a, b) => {
        if (this.state.sort === "Newest") {
          console.log("in newest")
          return new Date(b.DateReleased) - new Date(a.DateReleased)
        } else if (this.state.sort === "Oldest") {
          return new Date(a.DateReleased) - new Date(b.DateReleased)
        }

        return true
      })

    // const filteredBooks = this.state.books.sort((a, b) => {
    //   if (this.state.sort === "Newest") {
    //     console.log("in newest")
    //     return new Date(b.DateReleased) - new Date(a.DateReleased)
    //   } else if (this.state.sort === "Oldest") {
    //     return new Date(a.DateReleased) - new Date(b.DateReleased)
    //   }

    //   return true
    // })
    return (
      <MuiThemeProvider theme={theme}>
        {
          <Header
            curentUser={this.state.curentUser}
            searchBook={this.searchBook}
            handleChange={this.handleChange1}
            handleSort={this.handleSort}
            sort={this.state.sort}
            handleFilter={this.handleFilter}
            filter={this.state.filter}
          />
        }
        {this.state.books ? (
          <>
            <Carausel carousel={filterCarousel} />
            <Books
              books={filteredBooks}
              i={this.state.i}
              handlePage={this.handlePage.bind(this)}
            />
          </>
        ) : (
          <>
            <LinearProgress color="secondary" />
          </>
        )}
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    book: state.book
  }
}

export default connect(mapStateToProps)(Landing)
