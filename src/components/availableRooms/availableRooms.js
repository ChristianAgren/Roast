// @ts-nocheck

import React from "react";

import { UserContext } from "../../contexts/userContext";
import {
	Button,
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

	const rooms = {
		open: [
			{
				id: 1,
				name: "Room 1",
				password: "",
				color:"#ff8866"
			},
			{
				id: 2,
				name: "Room 2",
				password: "",
				color:"#ff8866"
			},
			{
				id: 4,
				name: "Room 3",
				password: "",
				color:"#ff8866"
			},
			{
				id: 5,
				name: "this is a very long string",
				password: "",
				color:"#ff8866"
			},
			{
				id: 6,
				name: "short",
				password: "",
				color:"#ff8866"
			},
			{
				id: 7,
				name: "smol",
				password: "",
				color:"#ff8866"
			},
		],
		locked: [
			{
				id: 3,
				name: "lol",
				password: "a",
				color:"#ff8866"
			},
			{
				id: 3123,
				name: "lol",
				password: "a",
				color:"#ff8866"
			},
			{
				id: 323,
				name: "lol",
				password: "a",
				color:"#ff8866"
			},
			{
				id: 353432,
				name: "lol",
				password: "a",
				color:"#ff8866"
			},
			{
				id: 345645,
				name: "lol",
				password: "a",
				color:"#ff8866"
			},
			{
				id: 375675,
				name: "lol",
				password: "a",
				color:"#ff8866"
			},
		]
	}

	const onJoinClick = (event, joinRoom) => {
		joinRoom(event);

		props.changeView(event.target.id);
		props.toggleDrawer();
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				// <>
				// 	<p>rooms</p>
				// 	<ul>
				// 		<li
				// 			onClick={(e) => onJoinClick(e, user.joinRoom)}
				// 			style={{ cursor: "pointer" }}
				// 			id="1">
				// 			hej1
				// 		</li>
				// 	</ul>
				// 	<p>locked rooms</p>
				// 	<ul>
				// 		<li
				// 			onClick={(e) => onJoinClick(e, user.joinRoom)}
				// 			style={{ cursor: "pointer" }}
				// 			id="2">
				// 			då1
				// 		</li>
				// 	</ul>
				// </>
				<Container className={classes.mainContainer}>
					
					<Typography variant="overline">Open rooms</Typography>

					<div className={classes.hideRoomOverFlow}>
						<Grid container className={classes.roomsContainer}>
							<List dense>
								{
									rooms.open.map((room) =>
										<ListItem button key={`${room.id}:${room.name}`}>
											<FiberManualRecordIcon fontSize="small" className={classes.openIcon}/>
											<ListItemText
												primary={room.name}
												secondary="olika användare etc"
											/>
										</ListItem>,
										// <Grid item
										// 	key={`${room.id}:${room.name}`}
										// >
										// 	<Button variant="contained">{room.name}</Button>
										// </Grid>
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
									rooms.locked.map((room) =>
										<ListItem button key={`${room.id}:${room.name}`}>
											<ListItemAvatar>
												<Avatar>
													<LockIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={room.name}
												secondary="olika användare etc"
											/>
										</ListItem>,
										// <Grid item
										// 	key={`${room.id}:${room.name}`}
										// >
										// 	<Button variant="contained">{room.name}</Button>
										// </Grid>
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
