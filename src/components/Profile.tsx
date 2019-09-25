import * as React from 'react';
import Auth from './../Auth/Auth';
import './../css/Profile.css';
import ProfileReviewCard from './Card';

interface Props {
	auth: Auth;
}
interface State {
	profile: any;
	error: string;
}

class Profile extends React.Component<Props, State> {
	state = {
		profile: null,
		error: ''
	};

	componentDidMount() {
		this.loadUserProfile();
	}

	loadUserProfile() {
		this.props.auth.getProfile((profile, error) => this.setState({ profile, error }));
	}

	render() {
		const { profile } = this.state;
		if (!profile) return null;
		return (
			<div className="ContainerCardProfile">
				<ProfileReviewCard profile={this.state.profile} previewProfile={true} />
			</div>
		);
	}
}

export default Profile;
