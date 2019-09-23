import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Field from './../models/Tipos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

interface Props {
  profile: any;
  avatar: string;
  title: string;
  name: string;
  media: string;
  field: Field[];
}

export default function ProfileReviewCard(props: Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  function CarActionGoToLogin() {
    return (
      <CardActions disableSpacing>
        <IconButton aria-label="Log In to view profile">
          <LockOpenIcon />
        </IconButton>
        <Link to="/profile" >Log In to view profile</Link>
      </CardActions>
    );
  }
  function CarActionDefault() {
    return (
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    );
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.avatar && props.avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={new Date().toDateString()}
      />
      <CardMedia
        className={classes.media}
        image={props.media && props.media}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.name && props.name}
        </Typography>
      </CardContent>
      {props.profile ? CarActionDefault() : CarActionGoToLogin()}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {
            props.field.forEach(element =>
              <Typography paragraph>
                {element.value} :
                 {(props.profile && props.profile[element.key]) ? props.profile[element.key] : ""}
              </Typography>

            )
          }
          {
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}
