import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";

interface Props {
  auth: Auth;
}


class Nav extends React.Component<Props, {}> {
  render() {
    const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/public">Public</Link>
          </li>
          {isAuthenticated() && (
            <li>
              <Link to="/private">Private</Link>
            </li>
          )}
          {isAuthenticated() &&
            userHasScopes(["read:courses"]) && (
              <li>
                <Link to="/courses">Courses</Link>
              </li>
            )}
          <li>
            <button onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
