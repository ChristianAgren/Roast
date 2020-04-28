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
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) =>
	createStyles({
		mainContainer: {
			padding: theme.spacing(1.5, 0),
			display: "flex",
			flexDirection: "column",
			// flexWrap: 'nowrap'
			alignItems: "center",
			// justifyContent: 'center'
		},
		hideRoomOverFlow: {
			width: "100%",
			overflowX: "hidden",
			overflowY: "auto",
		},
		roomsContainer: {
			display: "flex",
			flexDirection: "column",
			maxHeight: "35vh",
			flexWrap: "nowrap",
			justifyContent: "flex-start",
			padding: theme.spacing(1),
		},
		openIcon: {
			color: "green",
			margin: theme.spacing(1, 2.5, 1, 1),
		},

		room: {
			position: "relative",

			margin: theme.spacing(1, 0, 4, 0),
			padding: theme.spacing(0.5, 0.5),
			borderRadius: "50rem",

			display: "flex",

			"& > *": {
				pointerEvents: "none",
			},
		},

		cutout: {
			width: "1.5rem",
			height: "1.5rem",

			background: "#727070 !important",
			borderRadius: "10rem",

			marginRight: theme.spacing(2),

			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			"& > *": {
				fontSize: "100%",
			},
		},
		activeUsers: {
			marginLeft: "auto",
			marginRight: "2rem",
		},
		users: {
			position: "absolute",
			top: theme.spacing(4),
			left: theme.spacing(2),

			fontStyle: "italic",

			[theme.breakpoints.down(300)]: {
				display: "none",
			},
		},
	})
);

function AvailableRooms(props) {
	const classes = useStyles();

	const onJoinClick = (event, joinRoom) => {
		joinRoom(event);
		props.changeView(true);
		props.toggleDrawer();
	};

	const generateFiveUsers = (users) => {
		const newList = users.slice(0, 5)
		return (
			newList.map((user, index) => 
				newList.length - 1 != index
				? `${user.name}, `
				: `and more... `
			)
		)
	}

	return (
		<UserContext.Consumer>
			{(user) => (
				<Container className={classes.mainContainer}>
					<Typography variant="overline">Open rooms</Typography>
					<div className={classes.hideRoomOverFlow}>
						<Grid container className={classes.roomsContainer}>
							<List dense>
								{user.availableRooms.open.map((room) => (
									<ListItem
										button
										id={room.id}
										onClick={(e) => onJoinClick(e, user.joinRoom)}
										key={`${room.id}:${room.name}`}
										style={{ background: room.color }}
										className={classes.room}>
										<div className={classes.cutout}></div>

										<Typography>
											{room.name}
											<em style={{ color: "#0008" }}>{room.id}</em>
										</Typography>
										{(room.users) ?
											<>
												<Typography className={classes.activeUsers}>
													{room.users.length} : active users
												</Typography>
												{(room.users.length != 0) ?
													<Typography
														className={classes.users}
														style={{ color: room.color }}>
														{room.users.length < 5 ?
															room.users.map((user, index) => 
																room.users.length - 1 === index
																	? `${user.name} `
																	: `${user.name}, `
															)
															: generateFiveUsers(room.users)
														}
													</Typography>
													: null
												}
											</>
											: null
										}

									</ListItem>
								))}
							</List>
						</Grid>
					</div>

					<Typography variant="overline">Locked rooms</Typography>
					<div className={classes.hideRoomOverFlow}>
						<Grid container className={classes.roomsContainer}>
							<List dense>
								{user.availableRooms.locked.map((room) => (
									<ListItem
										button
										onClick={(e) => onJoinClick(e, user.joinRoom)}
										id={room.id}
										key={`${room.id}:${room.name}`}
										style={{ background: room.color }}
										className={classes.room}>
										<div className={classes.cutout}>
											<LockIcon style={{ color: room.color }} />
										</div>

										<Typography>
											{room.name}
											<em style={{ color: "#0008" }}>{room.id}</em>
										</Typography>
										<Typography className={classes.activeUsers}>
											{room.users.length} : active users
										</Typography>

										<Typography
											className={classes.users}
											style={{ color: room.color }}>
											{room.users.length < 5 ?
												room.users.map((user, index) => 
													room.users.length - 1 === index
														? `${user.name} `
														: `${user.name}, `
												)
												: generateFiveUsers(room.users)
											}
										</Typography>
									</ListItem>
								))}
							</List>
						</Grid>
					</div>
				</Container>
			)}
		</UserContext.Consumer>
	);
}

export default AvailableRooms;
