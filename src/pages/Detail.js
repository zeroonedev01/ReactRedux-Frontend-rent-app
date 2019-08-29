import React, { Component } from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Button from "@material-ui/core/Button"
import "../assets/Style.css"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Container from "@material-ui/core/Container"
import Chip from "@material-ui/core/Chip"
import Axios from "axios"
import { Link } from "react-router-dom"
import Edit from "../components/dialogs/Edit"
import swal from "sweetalert"
const API_URL = "http://localhost:3020/rentapp"

const styles = {
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: "#424242",
    color: "white",
    marginBottom: "32px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // backgroundImage: `url(${getAPI.Image})`,

    height: "340px"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  setChip: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    width: 120,
    color: "white"
  },
  setChip1: {
    marginLeft: "8px",
    marginRight: "8px",
    background: "linear-gradient(45deg, #43e97b 30%, #38f914 70%)",
    width: 120,
    color: "white"
  },
  setChip0: {
    marginLeft: "8px",
    marginRight: "8px",
    background: "linear-gradient(to right, #616161, #9bc5c3)",
    width: 120,
    color: "white"
  },
  setButton: {
    marginTop: "50px",
    background: "linear-gradient(to top, #00b4db, #0083b0)",
    color: "white"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: "24px"
    // "@media screen and (min-width: 48em)": {
    //   padding: "48px",
    //   paddingRight: 0
    // }
  },
  mainGrid: {
    marginTop: "8px"
  },
  sidebarAboutBox: {
    padding: "16px",
    backgroundColor: "#eeeeee"
  },
  sidebarSection: {
    marginTop: "24px"
  },
  buttonRight: {
    float: "right",
    marginRight: "40px"
  },
  setCOlor: {
    backgroundColor: "white"
  }
}

class Detail extends Component {
  state = {
    getAPI: []
  }
  handleDelete = e => {
    e.preventDefault()
    swal({
      title: "Are you sure?",
      text: "You want to delete this Book?",
      icon: "warning",
      dangerMode: true
    })
      .then(willDelete => {
        if (willDelete) {
          Axios.delete(
            `http://localhost:3020/rentapp/books/${this.props.match.params.idBook}`
          ).then(res => {
            swal({
              title: "Done!",
              text: "Book is deleted",
              icon: "success",
              timer: 2000,
              button: false
            }).then(function() {
              window.location.href = "http://localhost:3006/"
            })
          })
        }
      })
      .catch(err => console.log("error =", err))
  }
  componentDidMount = () => {
    const bookid = this.props.match.params.idBook
    const url = `${API_URL}/books/${bookid}`
    console.log(url)
    Axios.get(url)
      .then(res => {
        this.setState({ getAPI: res.data.values })
        console.log("getAPI =", this.state.getAPI)
        console.log("sdsdsd", this.state.getAPI[0])
      })
      .catch(err => console.log("error =", err))
  }
  render() {
    const { getAPI } = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        {getAPI.map((card, index) => (
          <main style={styles.setCOlor}>
            <Paper
              style={{
                position: "relative",
                backgroundColor: "#424242",
                color: "white",
                marginBottom: "32px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${card.Image})`,
                height: "430px"
              }}
            >
              {/* {
              <img
                style={{ display: "none" }}
                src="https://source.unsplash.com/user/erondu"
                alt="background"
              />
            } */}

              <div style={styles.overlay} />
              <Grid container>
                <Grid item md={12}>
                  <div style={styles.mainFeaturedPostContent}>
                    <div style={styles.buttonRight}>
                      <Edit bookInfo={getAPI[0]} />
                      <Button
                        color="inherit"
                        onClick={this.handleDelete.bind(this)}
                      >
                        Delete
                      </Button>
                    </div>

                    <Link to="/" style={{ textDecoration: "none" }}>
                      {" "}
                      <Fab size="medium" color="secondary" aria-label="back">
                        <ArrowBackIcon />
                      </Fab>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            <Container style={styles.cardGrid} maxWidth="lg">
              <div className="content">
                <Chip label={card.genre} style={styles.setChip} />
                {card.available == "true" ? (
                  <Chip label="Available" style={styles.setChip1} />
                ) : (
                  <Chip label="Not Available" style={styles.setChip0} />
                )}

                <img className="imageBook" src={`${card.Image}`} alt="sdsds" />
              </div>
              <Grid container spacing={5} style={styles.mainGrid}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h4" gutterBottom>
                    {card.Title}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {card.DateReleased}
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle1" gutterBottom align="justify">
                    {card.Description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button size="large" style={styles.setButton}>
                    Borrow
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </main>
        ))}
      </React.Fragment>
    )
  }
}

export default Detail
