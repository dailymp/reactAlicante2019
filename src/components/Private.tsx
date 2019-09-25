import * as React from "react";
import './../css/Private.css';
import Auth from "../Auth/Auth";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
interface Props {
  auth: Auth;
}
interface State {
  message: string;
}

class Private extends React.Component<Props, State> {
  state = {
    message: ""
  };
  componentDidMount() {
    fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then((response: Response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    this.state.message && store.addNotification({
      title: "Private Page!",
      message: this.state.message,
      type: "success",
      insert: "center",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
    return (
      <ReactNotification
      />
    )
  }
}

export default Private;
