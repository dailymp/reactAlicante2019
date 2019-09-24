import * as React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import './../css/Private.css';
import Auth from "../Auth/Auth";

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
    return (
			<List>
				<ListItem>
					<ListItemText className="ListItemTextPrivate" primary={this.state.message} />
				</ListItem>
			</List>
		) 
  }
}

export default Private;
