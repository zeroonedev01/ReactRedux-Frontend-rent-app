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
// import Menu from "@material-ui/core/Menu"
// import MenuItem from "@material-ui/core/MenuItem"
// import MoreIcon from "@material-ui/icons/MoreVert"
// import Input from "@material-ui/core/Input"
// import InputLabel from "@material-ui/core/InputLabel"
// import FormControl from "@material-ui/core/FormControl"
// import Select from "@material-ui/core/Select"
// import SortByAlpha from "@material-ui/icons/SortByAlpha"
import AddDialog from "./dialogs/Add"
import Axios from "axios"
const API_URL = "http://localhost:3020/rentapp"
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
    backgroundImage: `url(${"https://cdn.dribbble.com/users/588874/screenshots/2341875/dribbble.png"})`
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
    width: 120,
    height: 120
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
      books: [],
      searchField: "",
      sort: "",
      open: false,
      anchor: "left"
    }
  }
  searchBook = () => {
    const url = `${API_URL}/books/`
    Axios.get(url, {
      params: {
        search: this.state.searchField
      }
    })
      .then(res => {
        this.setState({ books: res.data.values })
        console.log("getBooks =", this.state.books)
      })
      .catch(err => console.log("error =", err))
  }
  handleChange = e => {
    console.log(e.target.value)
    this.setState({ searchField: e.target.value })
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

  render() {
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
          <Grid container justify="center" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
              className={classes.bigAvatar}
            />
          </Grid>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Misekai
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <IExplore />
            </ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <IHistory />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <AddDialog />
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
            <img src={logo} alt="logo" />

            <Typography className={classes.title} variant="h4" noWrap>
              Rent Book
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={this.handleChange}
                onKeyPress={this.searchBook}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
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

export default withStyles(styles, { withTheme: true })(PersistentDrawer)
