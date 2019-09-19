import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";
import RecipeReviewCard from './Card'
import { Button } from "@material-ui/core";
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
          <Link to="/profile">View entire profile</Link>
        ) : (
            <Button onClick={login}>Log In to view profile</Button>
          )}
      </div>
    );
  }
}

export default Home;
