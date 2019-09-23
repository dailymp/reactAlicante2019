import * as React from "react";
import Auth from "../Auth/Auth";
import ProfileReviewCard from "./Card";
import Field from './../models/Tipos';

interface Props {
  auth: Auth;
}
interface State {
  profile:any;
  error:string;
}

class Profile  extends React.Component<Props, State>  {
  state = {
    profile: null,
    error: ""
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  }

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <>
        <ProfileReviewCard profile= {profile}  avatar={this.state.profile.name} title="" name="" media="" field={[new Field()]} />
        {/* <h1>Profile</h1>
        <p>{profile.nickname}</p>
        <img
          style={{ maxWidth: 50, maxHeight: 50 }}
          src={profile.picture}
          alt="profile pic"
        /> */}
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </>
    );
  }
}

export default Profile;
