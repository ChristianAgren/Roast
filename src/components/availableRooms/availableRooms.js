// @ts-nocheck

import React from "react";

import { UserContext } from "../../contexts/userContext";
import {
	// Button,
	Container,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
	makeStyles,
	createStyles,
} from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) =>
	createStyles({
		mainContainer: {
			padding: theme.spacing(1.5, 0, 1.5, 0),
			display: 'flex',
			flexDirection: 'column',
			// flexWrap: 'nowrap'
			alignItems: 'center',
			// justifyContent: 'center'
		},
		hideRoomOverFlow: {
			width: '100%',
			overflowX: 'hidden',
			overflowY: 'auto'
		},
		roomsContainer: {
			display: 'flex',
			flexDirection: 'column',
			maxHeight: '35vh',
			flexWrap: 'nowrap',
			justifyContent: 'flex-start',
			'& > .MuiGrid-item': {
				padding: 0,
				margin: theme.spacing(1, 0, 1, 3)
			},
			'& > .MuiGrid-item:last-child': {
				padding: theme.spacing(0, 2.2, 0, 0)
			},
			'& .MuiButton-contained': {
				backgroundColor: theme.palette.background.paper,
				width: '3rem',
				height: '3.5rem'
			}
		},
		openIcon: {
			color: 'green',
			margin: theme.spacing(1, 2.5, 1, 1)
		}
	})
);

function AvailableRooms(props) {
	const classes = useStyles();

	const onJoinClick = (event, joinRoom) => {
		joinRoom(event);
		props.changeView(event.target.id);
		props.toggleDrawer();
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<Container className={classes.mainContainer}>
					<Typography variant="overline">Open rooms</Typography>
					<div className={classes.hideRoomOverFlow}>
						<Grid container className={classes.roomsContainer}>
							<List dense>
								{
									user.availableRooms.open.map((room) =>
										<ListItem 
											button 
											key={`${room.id}`}
											id={room.id}
											onClick={(event) => onJoinClick(event, user.joinRoom)}
											>
											<FiberManualRecordIcon 
												fontSize="small" 
												className={classes.openIcon}/>
											<ListItemText
												primary={room.id}
												secondary="olika användare etc"
											/>
										</ListItem>
									)
								}
							</List>
						</Grid>
					</div>
					<Typography variant="overline">Locked rooms</Typography>
					<div className={classes.hideRoomOverFlow}>
						<Grid container className={classes.roomsContainer}>
							<List dense>
								{
									user.availableRooms.locked.map((room) =>
										<ListItem button key={`${room.id}`}>
											<ListItemAvatar>
												<Avatar>
													<LockIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={room.id}
												secondary="olika användare etc"
											/>
										</ListItem>,
									)
								}
							</List>
						</Grid>
					</div>
				</Container>
			)}
		</UserContext.Consumer>
	);
}

export default AvailableRooms;
