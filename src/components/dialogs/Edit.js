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
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import Axios from "axios"

import FormLabel from "@material-ui/core/FormLabel"
import swal from "sweetalert"

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      fields: this.props.bookInfo,
      getGen: []
    }
  }

  handleClickOpen = () => {
    this.setState({ open: !this.state.open })
  }

  handleEdit = e => {
    let data = {
      title: this.state.fields.Title,
      desc: this.state.fields.Description,
      image: this.state.fields.Image,
      available: this.state.fields.available,
      genre: this.state.fields.genre,
      date: this.state.fields.DateReleased
    }
    Axios.patch(
      `http://localhost:3020/rentapp/books/${this.state.fields.id}`,
      data
    )
      .then(res => {
        console.log(res)
        console.log(res.data)
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
          text: "user Edited",
          icon: "success",
          timer: 2000,
          button: false
        }).then(function() {
          window.location.reload()
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onInputChange(e) {
    console.log(e.target.name, e.target.value)
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }
  componentDidMount = () => {
    const url = `http://localhost:3020/rentapp/genres/`
    Axios.get(url)
      .then(res => {
        this.setState({ getGen: res.data.values })
        console.log("getGen =", this.state.getGen)
      })
      .catch(err => console.log("error =", err))
  }

  render() {
    // console.log(this.state.fields)
    const {
      open,
      fields: { id, Title, Description, Image, available, genre, DateReleased },
      getGen
    } = this.state
    let avai = available === "true" ? 1 : 2

    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen}>
          Edit
        </Button>
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
                value={this.props.bookInfo.id}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="title"
                label="Title"
                name="Title"
                value={Title}
                onChange={this.onInputChange.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="image"
                label="image"
                name="Image"
                onChange={this.onInputChange.bind(this)}
                value={Image}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="DateReleased"
                label="date"
                onChange={this.onInputChange.bind(this)}
                value={DateReleased}
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
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
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
                    checked={avai === 1}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    checked={avai === 2}
                    label="false"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <TextField
                id="desc"
                label="Description"
                multiline
                rowsMax="4"
                value={Description}
                name="Description"
                onChange={this.onInputChange.bind(this)}
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickOpen} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleEdit.bind(this)} color="secondary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Edit
