import * as React from "react";
import Auth from "../Auth/Auth";
import { Location, History } from "history";


interface Props {
  history: History;
  location: Location;
  auth: Auth;
}

class Callback extends React.Component<Props, {}> {
  componentDidMount = () => {
    // Handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  };
  render() {
    return <h1>Loading...</h1>;
  }
}

export default Callback;
