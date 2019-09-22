import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";
import RecipeReviewCard from './Card'
import { Button, Typography, ListItem, List, Container } from "@material-ui/core";
import './css/Home.css';

interface Props {
  auth: Auth;
}

class Home extends React.Component<Props> {

  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <Container maxWidth="sm" className="ContainerCardHome">
        <RecipeReviewCard />
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
