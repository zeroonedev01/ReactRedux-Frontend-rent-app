import React from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"
import logo from "../assets/bookshelf.svg"
import jwt from "../helpers/jwt"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://github.com/tejojr">
        ZerefWeismann
      </Link>{" "}
      {new Date().getFullYear()}
      {". Built with "}
      <Link color="inherit" to="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  )
}

const styles = {
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/1600x900/?book)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: "80px 32px",
    display: "flex",
    flexDirection: "column"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "8px"
  },
  submit: {
    margin: "24px 0px 16px"
  },
  title: {
    color: "#FFFFFF",
    marginLeft: "80px",
    marginTop: "80px"
  },
  rightImage: {
    float: "right",
    marginRight: "32px",
    marginTop: "8px"
  },
  setLink: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: { username: "", email: "", password: "", role_id: 2 }
    }
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }

  onFormSubmit(e) {
    e.preventDefault()
    console.log(this.state.fields)
    // jwt
    //   .signUp(this.state.fields)
    //   .then(res => {
    //     this.setState({ fields: { username: "", email: "", password: "" } })
    //     if (res) {
    //       console.log("dsdsd")
    //     }
    //   })
    //   .then(res => {})
    //   .catch(err => {
    //     console.error(err)
    //     alert("Fail! Sign UP")
    //   })
  }

  render() {
    const { username, email, password } = this.state.fields
    return (
      <Grid container component="main" style={styles.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} style={styles.image}>
          <Hidden smDown>
            <Typography component="h1" variant="h4" style={styles.title}>
              Book is a window to the World ...
            </Typography>
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Link to="/">
            <img src={logo} alt="logo" style={styles.rightImage} />
          </Link>
          <div style={styles.paper}>
            <Typography component="h3" variant="h3">
              Register
            </Typography>
            <Typography component="h1" variant="h6">
              Welcome Back, Please Register to create account
            </Typography>
            <form style={styles.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={this.onInputChange}
                autoComplete="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={this.onInputChange}
                value={email}
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={this.onInputChange}
                value={password}
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onFormSubmit}
                style={styles.submit}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2" style={styles.setLink}>
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default Register
