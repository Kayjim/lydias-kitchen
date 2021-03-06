import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCart from './ShoppingCart';
import '../css/iconography.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#A7414A',
    color: "#fff"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    '&:hover': {
      color: '#6A8A82',
      backgroundColor: '#A7414A'
    }
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    color: '#282726'
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
  },
  kitchenIcon: {
    textDecoration: "none",
    color: "white",
    '&:hover': {
      color: '#6A8A82',
    },
  },
  logoutBtnCtr: {
    padding: '10px',
    position: "relative",
  },
}));


export default function SearchAppBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    props.handleSearch(e.target.value);
  }

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
          <Typography className={classes.title} variant="h6" noWrap>
            <a href='/' className={classes.kitchenIcon}>Lydia's Kitchen</a>
          </Typography>
          <div className={classes.search} style={{ flexGrow: 2 }}>
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
              onChange={handleSearch}
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
        <Link href='/home'>
          <MenuItem onClick={handleClose}>
            <div className='menu-icon home-icon'></div>Home
        </MenuItem>
        </Link>
        {/* <Link href='/cookies'>
          <MenuItem onClick={handleClose}>
            <div className='menu-icon cookie-icon'></div>Cookies
          </MenuItem>
        </Link>
        <Link href='/cakes'>
          <MenuItem onClick={handleClose}>
          <div className='menu-icon cake-icon'></div>Cakes
      </MenuItem>
        </Link>
        <Link href='/foodprep'>
          <MenuItem onClick={handleClose}>
          <div className='menu-icon prep-icon'></div>Food Prep
      </MenuItem>
        </Link> */}
        <Link href='/order'>
          <MenuItem onClick={handleClose}>
            <ShoppingCart height={20} width={20} />Order
      </MenuItem>
        </Link>
      </Menu>
    </div >
  );
}
