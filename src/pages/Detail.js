import React from "react"
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

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage:
      "url(http://smpn1mojoagung.sch.id/wp-content/uploads/2016/09/Ayatayatcinta-ok.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: "linear-gradient(45deg, #43e97b 30%, #38f914 70%)",
    width: 120,
    color: "white"
  },
  setButton: {
    marginTop: theme.spacing(1),
    background: "linear-gradient(to top, #00b4db, #0083b0)",
    color: "white"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(1)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  buttonRight: {
    float: "right",
    marginRight: theme.spacing(5)
  },
  setCOlor: {
    backgroundColor: "white"
  }
}))

export default function DetailBook() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.setCOlor}>
        <Paper className={classes.mainFeaturedPost}>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={12}>
              <div className={classes.mainFeaturedPostContent}>
                <div className={classes.buttonRight}>
                  <Button color="inherit">Edit</Button>
                  <Button color="inherit">Delete</Button>
                </div>
                <Fab size="medium" color="secondary" aria-label="back">
                  <ArrowBackIcon />
                </Fab>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Container className={classes.cardGrid} maxWidth="lg">
          <div className="content">
            <Chip label="Genre" className={classes.setChip} />
            <Chip label="Available" className={classes.setChip1} />
            <img
              className={"imageBook"}
              src={
                "http://smpn1mojoagung.sch.id/wp-content/uploads/2016/09/Ayatayatcinta-ok.jpg"
              }
              alt="sdsds"
            />
          </div>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Judul Gan Judul sdsd sdsd sdsd sds sdsd
              </Typography>
              <Typography variant="h6" gutterBottom>
                8 Agustus 2019
              </Typography>
              <Divider />
              <Typography variant="subtitle1" gutterBottom align="justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ac diam eget est rutrum ultrices. Donec laoreet enim a massa
                dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan
                lectus. Nullam auctor auctor consequat. Donec semper magna erat,
                sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet
                interdum bibendum, nibh velit accumsan tellus, vel vehicula
                tellus leo vitae ipsum. Praesent sit amet libero sed orci
                ullamcorper efficitur. Pellentesque in euismod purus, sit amet
                ultrices tortor. Vestibulum ante dui, tempor at dui id,
                tincidunt euismod diam. Integer pellentesque massa nibh, ac
                eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci
                ut, accumsan facilisis lacus. Nullam at elementum nibh, ac
                gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed
                fringilla consequat ante vitae lobortis. Cras posuere ligula vel
                enim suscipit malesuada. Vivamus non nulla ut ante imperdiet
                euismod quis nec massa.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button size="large" className={classes.setButton}>
                Borrow
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  )
}

// import React, { Component } from "react"
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
// // import Header from "../components/NavBar"
// import Detail from "../components/DetailBook"

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#FFFFFF"
//     },
//     secondary: {
//       main: "#000000"
//     }
//   }
// })

// class Landing extends Component {
//   render() {
//     return <MuiThemeProvider theme={theme}>{<Detail />}</MuiThemeProvider>
//   }
// }

// export default Landing
