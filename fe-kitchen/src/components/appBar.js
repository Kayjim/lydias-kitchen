import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CakeIcon from '@material-ui/icons/CakeTwoTone';
import CookieIcon from '@material-ui/icons/BlurCircularTwoTone';
import FoodPrepIcon from '@material-ui/icons/KitchenTwoTone';
import OrderIcon from '@material-ui/icons/ShoppingCartTwoTone';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: "linear-gradient(35deg, #A7414A, #962715)",
    color: "#fff"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
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
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));


export default function SearchAppBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          {/* testing menu items */}
          <MenuButton
            iconType={AccountCircle}
            items={["Create", "List1", "List2"]}
          />
          <MenuButton
            iconType={MenuIcon}
            items={["Profile", "User Management", "Logout"]}
          />
          {/* end testing menu items */}
          <Typography className={classes.title} variant="h6" noWrap>
            Lydia's Kitchen
          </Typography>
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
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><CookieIcon />Cookies</MenuItem>
        <MenuItem onClick={handleClose}><CakeIcon />Cakes</MenuItem>
        <MenuItem onClick={handleClose}><FoodPrepIcon />Food Prep</MenuItem>
        <MenuItem onClick={handleClose}><OrderIcon />Order</MenuItem>
      </Menu>
    </div>
  );
}
