import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import IAdd from "@material-ui/icons/AddBox"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import swal from "sweetalert"
import { getGenre } from "../../Publics/actions/genre"
import { addBook, getBook } from "../../Publics/actions/book"
import { connect } from "react-redux"
import check from "../../helpers/jwt"
class Add extends Component {
  state = {
    open: false,
    fields: {
      id: "",
      title: "",
      desc: "",
      image: "",
      available: 1,
      genre: "",
      date: ""
    },
    getGen: []
  }
  handleClickOpen = () => {
    this.setState({ open: !this.state.open })
  }
  handleSubmit = async () => {
    const token = JSON.parse(check.getToken())
    await this.props
      .dispatch(addBook(this.state.fields, token))
      .then(res => {
        console.log("add Book", res.action.payload.data.status)
        if (res.action.payload.data.status === 409) {
          swal({
            title: "Warning!",
            text: `${res.action.payload.data.message}`,
            icon: "warning",
            timer: 2000,
            button: false
          })
        } else if (res.action.payload.data.status === 403) {
          swal({
            title: "Warning!",
            text: `No token provided`,
            icon: "warning",
            timer: 2000,
            button: false
          })
        } else if (res.action.payload.data.status === 500) {
          swal({
            title: "Warning!",
            text: `Fail to Authentication. Error`,
            icon: "warning",
            timer: 2000,
            button: false
          })
        } else {
          this.setState({
            open: false,
            fields: {
              id: "",
              title: "",
              desc: "",
              image: "",
              available: "",
              genre: "",
              date: ""
            }
          })
          swal({
            title: "Done!",
            text: "Book is added to database",
            icon: "success",
            timer: 2000,
            button: false
          }).then(function() {
            window.location.reload()
          })
        }
      })
      .catch(err => {
        swal({
          title: "Failed!",
          text: "Add Book Failed!" + err,
          icon: "warning",
          buttons: "oke"
        })
      })
  }
  onInputChange(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }
  componentDidMount = async () => {
    await this.props.dispatch(getGenre())
    this.setState({ getGen: this.props.genre.genre })
    console.log("getGen =", this.state.getGen)
  }

  render() {
    const {
      open,
      fields: { id, title, desc, image, genre, date },
      getGen
    } = this.state

    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <IAdd />
          </ListItemIcon>
          <ListItemText primary="Add Book" />
        </ListItem>
        <Dialog
          open={open}
          onClose={this.handleClickOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill form</DialogContentText>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="id"
                label="id"
                name="id"
                value={id}
                onChange={this.onInputChange.bind(this)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={title}
                onChange={this.onInputChange.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="image"
                label="image"
                name="image"
                onChange={this.onInputChange.bind(this)}
                value={image}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="date"
                label="date"
                onChange={this.onInputChange.bind(this)}
                value={date}
                id="date"
              />
              <FormControl
                style={{
                  margin: 0,
                  fullWidth: true,
                  display: "flex",
                  wrap: "nowrap",
                  color: "black"
                }}
              >
                <InputLabel htmlFor="genre">genre</InputLabel>
                <Select
                  value={genre}
                  name="genre"
                  onChange={this.onInputChange.bind(this)}
                >
                  {getGen.map((genre1, index) => (
                    <MenuItem value={parseInt(genre1.id)} key={index}>
                      {genre1.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              {/* <FormControl component="fieldset">
                <FormLabel component="legend">Genre</FormLabel>
                <RadioGroup
                  aria-label="available"
                  name="available"
                  value={available}
                  onChange={this.onInputChange.bind(this)}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="true"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="false"
                  />
                </RadioGroup>
              </FormControl>
              <br /> */}
              <TextField
                variant="outlined"
                fullWidth
                id="desc"
                label="Description"
                multiline
                rowsMax="4"
                value={desc}
                name="desc"
                onChange={this.onInputChange.bind(this)}
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickOpen} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    genre: state.genre,
    book: state.book
  }
}

export default connect(mapStateToProps)(Add)
