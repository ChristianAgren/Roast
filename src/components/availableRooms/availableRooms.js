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

	const rooms = {
		open: [
			{
				id: 1,
				name: "Room 1",
				password: "",
				users: ["BLOB", "dang3rz0ne"],
				color: "#ff8866",
			},
			{
				id: 2,
				name: "Room 2",
				password: "",
				users: ["BLOB", "dang3rz0ne", "Wrampa", "jebbo", "FlOW1r", "Skotzsha", "ivan", "celticFan89"],
				color: "#ff8866",
			},
		],
		locked: [
			{
				id: 3,
				name: "locked 1",
				password: "a",
				users: ["BLOB", "dang3rz0ne", "Wrampa"],
				color: "#56bff4",
			},
			{
				id: 3123,
				name: "locked 2",
				password: "a",
				users: ["BLOB", "dang3rz0ne", "Wrampa"],
				color: "#56bff4",
			},
			{
				id: 323,
				name: "locked 3",
				password: "a",
				users: ["BLOB", "dang3rz0ne", "Wrampa"],
				color: "#56bff4",
			},
		],
	};

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
								{rooms.open.map((room) => (
									<ListItem
										button
										id={room.id}
										onClick={(e) => onJoinClick(e, user.joinRoom)}
										key={`${room.id}:${room.name}`}
										style={{ background: room.color }}
										className={classes.room}>
										<div className={classes.cutout}></div>

										<Typography>{room.name}</Typography>
										<Typography className={classes.activeUsers}>
											{room.users.length} : active users
										</Typography>

										<Typography
											className={classes.users}
											style={{ color: room.color }}>
											{room.users.length > 5
												? room.users
														.slice(0, 5)
														.toString()
														.split(",")
														.join(", ")
														.concat(" ...")
												: room.users.toString().split(",").join(", ")}
										</Typography>
									</ListItem>
								))}
							</List>
						</Grid>
					</div>

					<Typography variant="overline">Locked rooms</Typography>
					<div className={classes.hideRoomOverFlow}>
						<Grid container className={classes.roomsContainer}>
							<List dense>
								{rooms.locked.map((room) => (
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

										<Typography>{room.name}</Typography>
										<Typography className={classes.activeUsers}>
											{room.users.length} : active users
										</Typography>

										<Typography
											className={classes.users}
											style={{ color: room.color }}>
											{room.users.length > 5
												? room.users
														.slice(0, 5)
														.toString()
														.split(",")
														.join(", ")
														.concat(" ...")
												: room.users.toString().split(",").join(", ")}
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
