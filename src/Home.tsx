import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";

interface Props {
  auth: Auth;
}
class Home extends React.Component<Props> {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <h1>Home</h1>
        {isAuthenticated() ? (
          <Link to="/profile">View profile</Link>
        ) : (
            <button onClick={login}>Log In</button>
          )}
      </div>
    );
  }
}

export default Home;
