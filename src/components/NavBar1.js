import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import clsx from "clsx"
import { fade } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import IExplore from "@material-ui/icons/Explore"
import IHistory from "@material-ui/icons/History"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import logo from "../assets/bookshelf.svg"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
// import SortByAlpha from "@material-ui/icons/SortByAlpha"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import InputIcon from "@material-ui/icons/Input"
import HowToRegIcon from "@material-ui/icons/HowToReg"
import jwt from "../helpers/jwt"
import swal from "sweetalert"

// import Menu from "@material-ui/core/Menu"
// import MenuItem from "@material-ui/core/MenuItem"
// import MoreIcon from "@material-ui/icons/MoreVert"
// import Input from "@material-ui/core/Input"
// import InputLabel from "@material-ui/core/InputLabel"
// import FormControl from "@material-ui/core/FormControl"
// import Select from "@material-ui/core/Select"
// import SortByAlpha from "@material-ui/icons/SortByAlpha"
import { getGenre } from "../Publics/actions/genre"
import Box from "@material-ui/core/Box"
import { connect } from "react-redux"
import AddDialog from "./dialogs/Add"
const drawerWidth = 240

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    marginLeft: theme.spacing(1),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  garox: {
    backgroundImage: `url(${"https://www.sammobile.com/wp-content/uploads/2017/05/Connections-675x540.jpg"})`
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 250
      }
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  setMaargin: {
    marginLeft: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
})

class PersistentDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchor: "left",
      selectOptions: [
        {
          value: "Newest",
          id: "Newest"
        },
        {
          value: "Oldest",
          id: "Oldest"
        }
      ],
      getGen: []
    }
  }
  componentDidMount = async () => {
    await this.props.dispatch(getGenre())
    this.setState({ getGen: this.props.genre.genre })
    console.log("getGen =", this.state.getGen)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    })
  }
  renderSelectOptions = () => {
    return this.state.selectOptions.map((dt, i) => (
      <MenuItem key={dt.id} value={dt.id}>
        {dt.value}
      </MenuItem>
    ))
  }
  onLogout = () => {
    swal({
      title: "confirm",
      text: "Are you want to log out?",
      icon: "warning",
      dangerMode: true
    })
      .then(willDelete => {
        if (willDelete) {
          jwt.logOut()
          swal({
            title: "Log Out!",
            text: `Log Out Success`,
            icon: "success",
            timer: 2000,
            button: false
          })
          window.location.href = "/"
        }
      })
      .catch(err => console.log("error =", err))
    // e.preventDefault()
    // await jwt.logOut()
    // await swal({
    //   title: "Log Out!",
    //   text: `Log Out Success`,
    //   icon: "success",
    //   timer: 2000,
    //   button: false
    // })
    // window.location.href = "/"
  }

  render() {
    const { getGen } = this.state
    const { classes, theme } = this.props
    const { anchor, open } = this.state

    const drawer = (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.garox}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          {this.props.curentUser ? (
            <>
              <Grid container justify="center" alignItems="center">
                <Avatar
                  alt="avatar"
                  // src="https://s.barraques.cat/pngfile/s/163-1635738_zeref-images-chibi-zeref-wallpaper-and-background-photos.png"
                  src="https://i.pravatar.cc/300"
                  className={classes.bigAvatar}
                />
              </Grid>
              <Typography align="center" color="primary" gutterBottom>
                <Box fontWeight="fontWeightBold" m={1}>
                  {this.props.curentUser.email}
                </Box>
                <Button
                  size="small"
                  align="center"
                  variant="contained"
                  color="secondary"
                  onClick={this.onLogout}
                >
                  Log Out
                </Button>
              </Typography>
            </>
          ) : (
            ""
          )}
        </div>
        <Divider />
        <List>
          {this.props.curentUser ? (
            <>
              <ListItem button component={Link} to="/explore">
                <ListItemIcon>
                  <IExplore />
                </ListItemIcon>
                <ListItemText primary="Explore" />
              </ListItem>

              <ListItem button component={Link} to="/history">
                <ListItemIcon>
                  <IHistory />
                </ListItemIcon>
                <ListItemText primary="History" />
              </ListItem>
              {this.props.curentUser.role === "admin" ? (
                <>
                  <ListItem button component={Link} to="/manadmin">
                    <ListItemIcon>
                      <IHistory />
                    </ListItemIcon>
                    <ListItemText primary="Management Borrow" />
                  </ListItem>
                  <AddDialog />
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/login">
                <ListItemIcon>
                  <InputIcon />
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </ListItem>
              <ListItem button component={Link} to="/register">
                <ListItemIcon>
                  <HowToRegIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    )
    return (
      <div className={classes.root} style={{ marginTop: 20, padding: 30 }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>

            <Typography className={classes.title} variant="h4" noWrap>
              Rent Book
            </Typography>
            <div className={classes.grow} />
            {this.props.handleChange ? (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  onChange={this.props.handleChange}
                  onKeyPress={this.props.searchBook}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            ) : (
              ""
            )}
            <div className={classes.sectionDesktop}>
              {this.props.handleFilter ? (
                <form className={classes.root} autoComplete="off">
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="genre">genre</InputLabel>
                    <Select
                      value={this.props.filter}
                      name="Genre"
                      onChange={this.props.handleFilter}
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      {getGen.map((genre1, index) => (
                        <MenuItem value={genre1.name} key={index}>
                          {genre1.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </form>
              ) : (
                ""
              )}
              {this.props.handleSort ? (
                <form className={classes.root} autoComplete="off">
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="alltime">AllTime</InputLabel>
                    <Select
                      value={this.props.sort}
                      onChange={this.props.handleSort}
                    >
                      {this.renderSelectOptions()}
                    </Select>
                  </FormControl>
                </form>
              ) : (
                ""
              )}
            </div>
          </Toolbar>
        </AppBar>
        {drawer}
      </div>
    )
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
    genre: state.genre
  }
}
export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(PersistentDrawer)
)
