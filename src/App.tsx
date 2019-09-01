import * as React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";

interface Props {
  history: object;
}
interface State {
auth: Auth;
tokenRenewalComplete: boolean;
}
export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false
    };
  }

  componentDidMount() {
    this.state.auth.renewToken(() =>
      this.setState({ tokenRenewalComplete: true })
    );
  }

  render() {
    const { auth } = this.state;
    // Show loading message until the token renewal check is completed.
    if (!this.state.tokenRenewalComplete) return "Loading...";
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={(props: Props) => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={(props: Props) => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute path="/profile" component={Profile} scopes= {[]} />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/private" component={Private} scopes= {[]} />
          <PrivateRoute
            path="/courses"
            component={Courses}
            scopes={["read:courses"]}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
