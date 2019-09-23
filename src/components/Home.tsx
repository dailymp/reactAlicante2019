import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";
import ProfileReviewCard from './Card'
import { Button } from "@material-ui/core";
import Field from './../models/Tipos';

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
  Campos:Field[] = [];
  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  }
  loadConfigField() {
    this.Campos.push({
      key:"sub",
      value:"ID Social",
      order:1
    });
    this.Campos.push({
      key:"given_name",
      value:"Nombre dado",
      order:2
    });
    this.Campos.push({
      key:"family_name",
      value:"Nombre familia",
      order:3
    });
    this.Campos.push({
      key:"nickname",
      value:"Nick",
      order:4
    });
    this.Campos.push({
      key:"name",
      value:"Nombre",
      order:5
    });
  }
  render() {
    const { isAuthenticated, login } = this.props.auth;
    this.loadConfigField();

    return (
      <div>
        <ProfileReviewCard profile={this.state.profile} avatar={this.state.profile.given_name} title={this.state.profile.nickname} name={this.state.profile.name}  media={this.state.profile} field={this.Campos} />
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
