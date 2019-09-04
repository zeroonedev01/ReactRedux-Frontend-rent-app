import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import check from "../../helpers/jwt"

import { getGenre } from "../../Publics/actions/genre"
import { editBook } from "../../Publics/actions/book"
import { connect } from "react-redux"
import FormLabel from "@material-ui/core/FormLabel"
import swal from "sweetalert"

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      fields: {
        id: this.props.bookInfo.id,
        title: this.props.bookInfo.Title,
        desc: this.props.bookInfo.Description,
        available: this.props.bookInfo.statusid,
        genre: this.props.bookInfo.genreid,
        date: this.props.bookInfo.DateReleased
      },
      image: {},
      getGen: []
    }
    this.onInputChange = this.onInputChange.bind(this)
  }

  handleClickOpen = () => {
    this.setState({ open: !this.state.open })
  }

  handleEdit = async e => {
    function isEmpty(obj) {
      return Object.keys({ Object }).length === 0
    }
    let formData = new FormData()
    console.log(isEmpty(this.state.image))
    // if (isEmpty(this.state.image)) {
    //   formData.append("image", this.state.image)
    //   console.log("sdsds1 sekarang", this.state.image)
    // } else {
    //   console.log("sayank")
    // }
    formData.append("id", this.state.fields.id)
    formData.append("title", this.state.fields.title)
    formData.append("desc", this.state.fields.desc)
    formData.append("genre", this.state.fields.genre)
    formData.append("date", this.state.fields.date)
    formData.append("available", this.state.fields.available)

    // const token = JSON.parse(check.getToken())
    // await this.props
    //   .dispatch(editBook(this.state.fields.id, formData, token))
    //   .then(res => {
    //     console.log(res)
    //     this.setState({
    //       open: false,
    //       fields: {
    //         id: "",
    //         title: "",
    //         desc: "",
    //         available: "",
    //         genre: "",
    //         date: ""
    //       },
    //       image: {}
    //     })
    //     swal({
    //       title: "Done!",
    //       text: "Book Edited",
    //       icon: "success",
    //       timer: 2000,
    //       button: false
    //     }).then(function() {
    //       window.location.reload()
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
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
  handleFile = e => {
    const file = Array.from(e.target.files)
    this.setState({ image: file[0] })
  }
  componentDidMount = async () => {
    await this.props.dispatch(getGenre())
    this.setState({ getGen: this.props.genre.genre })
    console.log("getGen =", this.state.getGen)
  }

  render() {
    console.log(this.state.fields.available)
    const {
      open,
      fields: { title, desc, available, genre, date },
      getGen
    } = this.state
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
                label="title"
                name="title"
                value={title}
                onChange={this.onInputChange.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="date"
                type="date"
                label="date"
                onChange={this.onInputChange.bind(this)}
                value={date}
                id="date"
                InputLabelProps={{
                  shrink: true
                }}
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
                <FormLabel component="legend">Available</FormLabel>
                <RadioGroup
                  aria-label="available"
                  name="available"
                  value={`${available}`}
                  onChange={this.onInputChange}
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
                fullWidth
                variant="outlined"
                id="desc"
                label="Description"
                multiline
                rowsMax="4"
                value={desc}
                name="desc"
                onChange={this.onInputChange.bind(this)}
                margin="normal"
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={this.handleFile}
              />
              <label htmlFor="contained-button-file">
                <Button variant="outlined" component="span" color="secondary">
                  Upload Image
                </Button>
              </label>
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

const mapStateToProps = state => {
  return {
    genre: state.genre,
    book: state.book
  }
}

export default connect(mapStateToProps)(Edit)
