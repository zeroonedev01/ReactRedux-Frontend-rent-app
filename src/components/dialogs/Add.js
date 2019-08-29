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
import swal from "sweetalert"
import FormLabel from "@material-ui/core/FormLabel"

class Add extends Component {
  state = {
    open: false,
    fields: {
      id: "",
      title: "",
      desc: "",
      image: "",
      available: "",
      genre: "",
      date: ""
    },
    getGen: []
  }
  handleClickOpen = () => {
    this.setState({ open: !this.state.open })
  }
  handleSubmit = e => {
    e.preventDefault()
    // let config = {
    //   headers: { Authorization: "bearer " + token }
    // }
    Axios.post("http://localhost:3020/rentapp/books", this.state.fields)
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
          text: "user is added to database",
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
    const {
      open,
      fields: { id, title, desc, image, available, genre, date },
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
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
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
            <Button onClick={this.handleSubmit.bind(this)} color="secondary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Add
