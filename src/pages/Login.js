import React, { Component, createRef } from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { login } from "../Publics/actions/auth"
import Hidden from "@material-ui/core/Hidden"
import logo from "../assets/bookshelf.svg"
import jwt from "../helpers/jwt"
import check from "../helpers/jwt"
import swal from "sweetalert"
import { connect } from "react-redux"
import ReCAPTCHA from 'react-google-recaptcha'

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

class Login extends Component {
  constructor() {
    super()
    this.reRef = createRef()
    this.state = {
      curentUser: check.getCurrentUser(),
      fields: {
        email: "",
        password: ""
      }
    }
  }

  onChange(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }
  handleLogin = async e => {
    e.preventDefault()
    const tokenCaptcha = await this.reRef.current.executeAsync()
    this.reRef.current.reset()

    await this.props
      .dispatch(login({...this.state.fields, tokenCaptcha}))
      .then(res => {
        if (res.action.payload.data.status === 403) {
          swal({
            title: "Warning!",
            text: `${res.action.payload.data.message}`,
            icon: "warning",
            timer: 2000,
            button: false
          })
        } else if (res.action.payload.data.status === 404) {
          swal({
            title: "Warning!",
            text: `${res.action.payload.data.message}`,
            icon: "warning",
            timer: 2000,
            button: false
          })
        } else {
          const token = JSON.stringify(
            res.action.payload.data.values.accessToken
          )
          if (token) {
            jwt.setToken(token)
            swal({
              title: "Done!",
              text: "Login Success",
              icon: "success",
              timer: 2000,
              button: false
            })
            this.props.history.push("/")
          } else {
            swal({
              title: "Warning!",
              text: `Failed Authentication`,
              icon: "warning",
              timer: 2000,
              button: false
            })
          }
        }
      })
      .catch(err => {
        console.error(err)
        alert("Failed")
      })
  }
  render() {
    console.log(this.state.curentUser)
    if (this.state.curentUser) {
      this.props.history.push("/")
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
             <ReCAPTCHA 
                ref={this.reRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                size="invisible"
              />
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
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Login)
