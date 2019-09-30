import React, { Component } from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Header from "../components/NavBar1"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import TableBook from "../components/common/TbBook"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Container from "@material-ui/core/Container"
import { connect } from "react-redux"
import { getBorrowId, searchTrx } from "../Publics/actions/borrow"
import check from "../helpers/jwt"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"

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
class ManAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curentUser: check.getCurrentUser(),
      token: "",
      data: [],
      searchField: "",
      sort: "",
      selectOptions: [
        {
          value: "Borrow",
          id: "borrow"
        },
        {
          value: "Return",
          id: "return"
        }
      ]
    }
  }
  componentDidMount = async () => {}
  searchBook = async e => {
    if (e.key === "Enter") {
      console.log("sdsds")
      const token = JSON.parse(check.getToken())
      console.log(token)
      // console.log(this.state.searchField)
      await this.props.dispatch(searchTrx(this.state.searchField, token))
      this.setState({ data: this.props.borrow.request })
      console.log("props", this.props.borrow.request)
      console.log("state", this.state.data)
    }
  }
  renderSelectOptions = () => {
    return this.state.selectOptions.map((dt, i) => (
      <MenuItem key={dt.id} value={dt.id}>
        {dt.value}
      </MenuItem>
    ))
  }
  handleSort = e => {
    console.log(e.target.value)
    this.setState({ sort: e.target.value })
  }
  handleChange1 = e => {
    console.log(e.target.value)
    this.setState({ searchField: e.target.value })
  }
  render() {
    if (!this.state.curentUser) {
      this.props.history.push("/login")
    }
    let filteredRequest = this.state.data.filter(dataFil => {
      if (this.state.sort === "borrow") {
        return dataFil.req_name === "borrow"
      } else if (this.state.sort === "return") {
        return dataFil.req_name === "return"
      } else {
        return dataFil.req_name === "borrow"
      }
      // return true
    })
    return (
      <MuiThemeProvider theme={theme}>
        {<Header curentUser={this.state.curentUser} />}
        <Container maxWidth="lg">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={3}>
              <TextField
                onChange={this.handleChange1}
                onKeyPress={this.searchBook}
                label="User ID"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <form
                style={{ display: "flex", flexWrap: "wrap" }}
                autoComplete="off"
              >
                <FormControl style={{ margin: "8px", minWidth: 200 }}>
                  <InputLabel htmlFor="acyion">Action</InputLabel>
                  <Select value={this.state.sort} onChange={this.handleSort}>
                    {this.renderSelectOptions()}
                  </Select>
                </FormControl>
              </form>
            </Grid>
          </Grid>
          {<TableBook data={filteredRequest}></TableBook>}
          <br></br>
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

export default connect(mapStateToProps)(ManAdmin)
