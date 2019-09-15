import * as React from "react";
import Auth from "./Auth/Auth";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

interface Props {
  auth: Auth;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export const Nav = (props: Props) => {
  const { isAuthenticated, login, logout, userHasScopes } = props.auth;
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              MY GYM APP
            </Typography>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/public">Public</Link>
            {isAuthenticated() && (
              <li>
                <Link to="/private">Private</Link>
              </li>
            )}
            {isAuthenticated() && userHasScopes(["read:courses"]) && (
              <li>
                <Link to="/courses">Courses</Link>
              </li>
            )}
            <Button
              onClick={isAuthenticated() ? logout : login}
              color="inherit"
            >
              {isAuthenticated() ? "Log Out" : "Log In"}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
   </>
  );
};

export default Nav;
