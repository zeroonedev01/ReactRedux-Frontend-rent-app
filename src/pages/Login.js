import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import { Link, Redirect } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"
import logo from "../assets/bookshelf.svg"
import jwt from "../helpers/jwt"
import axios from "axios"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/tejojr">
        ZerefWeismann
      </Link>{" "}
      {new Date().getFullYear()}
      {". Built with "}
      <Link color="inherit" href="https://material-ui.com/">
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

class Login extends Component {
  state = {
    fields: { email: "", password: "" },
    toHome: false
  }
  // onChange = this.onChange.bind(this)
  // handleLogin = this.handleLogin.bind(this)

  onChange(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }
  handleLogin(e) {
    e.preventDefault()
    jwt.logIn(this.state.fields).then(user => {
      this.setState({ fields: { email: "", password: "" } })
      if (user) {
        this.setState({ toHome: true })
      }
    })
  }
  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/" />
    }
    const { email, password } = this.state.fields
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
              Sign in
            </Typography>
            <Typography component="h1" variant="h6">
              Welcome Back, Please Login to your account
            </Typography>
            <form style={styles.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address or Username"
                name="email"
                autoComplete="email"
                onChange={this.onChange.bind(this)}
                value={email}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onChange.bind(this)}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                onClick={this.handleLogin.bind(this)}
                fullWidth
                variant="contained"
                color="primary"
                style={styles.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/register" variant="body2" style={styles.setLink}>
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2" style={styles.setLink}>
                    {"Don't have an account? Sign Up"}
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
export default Login
