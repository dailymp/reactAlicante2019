import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			maxWidth: 345
		},
		media: {
			height: 0,
			paddingTop: '56.25%' // 16:9
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest
			})
		},
		expandOpen: {
			transform: 'rotate(180deg)'
		},
		avatar: {
			backgroundColor: red[500]
		}
	})
);

interface Props {
	profile: any;
	previewProfile: boolean;
}
const profileUnloggedPicture = 'https://pbs.twimg.com/profile_images/906151350588887040/XC5RD0t-.jpg';
export default function ProfileReviewCard(props: Props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	function handleExpandClick() {
		setExpanded(!expanded);
	}

	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						Prof
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Preview Profile"
				subheader={new Date().toDateString()}
			/>
			<CardMedia
				className={classes.media}
				image={props.profile ? props.profile.picture : profileUnloggedPicture}
				title="Profile picture"
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.profile && props.profile.name}
				</Typography>
				{props.previewProfile && props.profile && (
					<>
						<Typography color="textSecondary">{props.profile.email}</Typography>
						<Typography variant="body2" component="p">
							{props.profile.email_verified && 'Verified email'}
							{!props.profile.email_verified && 'unverified email'}
							<br />
						</Typography>
					</>
				)}
			</CardContent>
			{props.previewProfile && (
				<>
					<CardActions disableSpacing>
						<IconButton aria-label="add to favorites">
							<FavoriteIcon />
						</IconButton>
						<IconButton aria-label="share">
							<ShareIcon />
						</IconButton>
						<IconButton
							className={clsx(classes.expand, {
								[classes.expandOpen]: expanded
							})}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>Details:</Typography>
							<Typography variant="h5" component="h2" gutterBottom>
								Nickname: {props.profile ? props.profile.nickname : 'React Alicante is an awesome event'}
							</Typography>
							<Typography paragraph>
								Role(s): {props.profile && props.profile['https://localhost:3000/roles']}
							</Typography>
							<br />
						</CardContent>
					</Collapse>
				</>
			)}
		</Card>
	);
}
