import * as React from "react";
import Auth from "./Auth/Auth";

interface Props {
  auth: Auth;
  history: History;
}
interface State {
  // tokenRenewalComplete: boolean;
  message:string;
}

class Private extends React.Component<Props, State> {
  state = {
    message: ""
  };
  componentDidMount() {
    fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then( (response:Response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    return <p>{this.state.message}</p>;
  }
}

export default Private;
