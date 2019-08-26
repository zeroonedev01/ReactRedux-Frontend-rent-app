import React from "react"
import clsx from "clsx"
import { fade, makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import logo from "../../assets/bookshelf.svg"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MoreIcon from "@material-ui/icons/MoreVert"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import SortByAlpha from "@material-ui/icons/SortByAlpha"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
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
  link: {
    margin: theme.spacing(1)
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
    marginLeft: theme.spacing(1),
    color: "#000000",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    },
    "&:focus": {
      textDecoration: "none"
    },
    "&:visited": {
      textDecoration: "none"
    },
    "&:link": {
      textDecoration: "none"
    },
    "&:active": {
      textecoration: "none"
    }
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))
export default function Header() {
  const classes = useStyles()
  const [open] = React.useState(false)
  //drawer
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null)
  }

  function handleMenuClose() {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget)
  }
  //sort
  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    />
  )
  //sortdate
  const [values, setValues] = React.useState({
    time: "",
    name: "hai"
  })
  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }))
  }
  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div classes={classes}>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="time-helper">Category</InputLabel>
            <Select
              value={values.time}
              onChange={handleChange}
              input={<Input name="time" id="time-helper" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </form>
        <IconButton>
          <SortByAlpha />
        </IconButton>
      </div>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="time-helper">AllTime</InputLabel>
          <Select
            value={values.time}
            onChange={handleChange}
            input={<Input name="time" id="time-helper" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
      </form>
    </Menu>
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
        <Toolbar>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Typography className={classes.title} variant="h4" noWrap>
            Rent Book
          </Typography>
          <Link to="/login" className={classes.setMaargin}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" className={classes.setMaargin}>
            <Button color="inherit">Register</Button>
          </Link>

          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <div className={classes.sectionDesktop}>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="time-helper">AllTime</InputLabel>
                <Select
                  value={values.time}
                  onChange={handleChange}
                  input={<Input name="time" id="time-helper" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
            </form>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="time-helper">Category</InputLabel>
                <Select
                  value={values.time}
                  onChange={handleChange}
                  input={<Input name="time" id="time-helper" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
            </form>
            <IconButton>
              <SortByAlpha />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
