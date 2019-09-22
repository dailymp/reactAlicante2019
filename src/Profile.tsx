import * as React from "react";
import Auth from "./Auth/Auth";
import Card from "@material-ui/core/Card";
import { CardContent, Typography, CardActions, Button, CardMedia } from "@material-ui/core";
import './css/Profile.css';

interface Props {
  auth: Auth;
}
interface State {
  profile: any;
  error: string;
}

class Profile extends React.Component<Props, State>  {
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
      <div className="ContainerCardProfile">
        <Card className="CardProfile">
            <CardMedia
              component="img"
              alt="Profile picture"
              height="140"
              image={profile.picture}
              title="Profile picture"
            />
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>

                {profile.nickname}
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p">
                {profile.name}
              </Typography>
              <Typography color="textSecondary">

                {profile.email}
              </Typography>
              <Typography variant="body2" component="p">
                {profile.email_verified &&
                  'Verified email'
                }
                {!profile.email_verified &&
                  'unverified email'
                }
                <br />
              </Typography>
            </CardContent>
          <CardActions>
            <Button className="ButtonProfile" size="small">Learn More</Button>
          </CardActions>
        </Card>
          {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
      </div>
    );
  }
}

export default Profile;
