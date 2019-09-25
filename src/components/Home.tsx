import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "./../Auth/Auth";
import { Button, Typography, ListItem, List, Container } from "@material-ui/core";
import './../css/Home.css';
import ProfileReviewCard from './Card'

interface Props {
  auth: Auth;
}

interface State {
  profile: any;
  error: string;
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

      <Container maxWidth="sm" className="ContainerCardHome">
        <ProfileReviewCard profile={this.state.profile} previewProfile={false} />
        {isAuthenticated() ? (
          <List >
            <ListItem button className="ContainerButtonHome">
              <Link className="LinkHome" to="/profile">
                <Typography className="TypographtHome" variant="h6">
                  View entire profile
              </Typography>
              </Link>
            </ListItem>
          </List>
        ) : (
            <List>
              <ListItem button className="ContainerButtonHome">
                <Button className="ButtonHome" onClick={login}>Log In to view profile</Button>
              </ListItem>
            </List>
          )}
      </Container>
    );
  }
}

export default Home;
