import * as React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

interface State {
	message: string;
}

class Public extends React.Component<{}, State> {
	state = {
		message: ''
	};

	componentDidMount() {
		fetch('/public')
			.then((response) => {
				if (response.ok) return response.json();
				throw new Error('Network response was not ok.');
			})
			.then((response) => this.setState({ message: response.message }))
			.catch((error) => this.setState({ message: error.message }));
	}

	render() {
		return (
			<List>
				<ListItem>
					<ListItemText primary={this.state.message} />
				</ListItem>
			</List>
		)
	}
}

export default Public;
