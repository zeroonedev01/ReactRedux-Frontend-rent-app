import React, { Component } from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Header from "../components/NavBar1"
import TableHis from "../components/common/TbHistory"
import TableRent from "../components/common/TbOnRent"
import TabletoDay from "../components/common/TbRetToday"

import Container from "@material-ui/core/Container"
// import Grid from "@material-ui/core/Grid"

import { connect } from "react-redux"
import { getBorrowId } from "../Publics/actions/borrow"
import check from "../helpers/jwt"

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
class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curentUser: check.getCurrentUser(),
      token: "",
      books: [],
      searchField: "",
      sort: "",
      carousel: [],
      data: [],
      i: 0
    }
  }
  componentDidMount = async () => {
    const token = JSON.parse(check.getToken())
    console.log(token)
    await this.props.dispatch(getBorrowId(this.state.curentUser.id, token))

    this.setState({ data: this.props.borrow.borrowById })
    console.log("getBorrow =", this.state.data)
  }
  render() {
    if (!this.state.curentUser) {
      this.props.history.push("/login")
    }
    // console.log("User =", this.state.curentUser.id)
    // console.log("token =", this.state.token)

    return (
      <MuiThemeProvider theme={theme}>
        {<Header curentUser={this.state.curentUser} />}
        <Container maxWidth="lg">
          {<TableRent data={this.state.data}></TableRent>}
          <br></br>
          {<TabletoDay data={this.state.data}></TabletoDay>}
          <br></br>
          {<TableHis data={this.state.data}></TableHis>}
        </Container>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    borrow: state.borrow
  }
}

export default connect(mapStateToProps)(History)
