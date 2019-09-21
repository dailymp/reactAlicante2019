import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";
import RecipeReviewCard from './Card'
import { Button, Typography, ListItem, List } from "@material-ui/core";

interface Props {
  auth: Auth;
}

class Home extends React.Component<Props> {

  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <RecipeReviewCard />
        {isAuthenticated() ? (
          <List>
            <ListItem>
              <Link to="/profile">
                <Typography variant="h6">
                  View entire profile
              </Typography>
              </Link>
            </ListItem>
          </List>
        ) : (
            <List>
              <ListItem>
                <Button onClick={login}>Log In to view profile</Button>
              </ListItem>
            </List>
          )}
      </div>
    );
  }
}

export default Home;
