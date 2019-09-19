import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";
import ProfileReviewCard from './Card'
import { Button } from "@material-ui/core";
interface Props {
  auth: Auth;
}

interface State {
  profile:any;
  error:string;
}

class Home extends React.Component<Props> {
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
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <ProfileReviewCard profile= {this.state.profile}/>
        {isAuthenticated() ? (
          <Link to="/profile">View entire profile</Link>
        ) : (
            <Button onClick={login}>Log In to view profile</Button>
          )}
      </div>
    );
  }
}

export default Home;
