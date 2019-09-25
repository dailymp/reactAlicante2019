import * as React from 'react';
import './../css/Public.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

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
		store.addNotification({
			title: "Public Page!",
			message: `${this.state.message}`,
			type: "success",
			insert: "top",
			container: "top-right",
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

export default Public;
