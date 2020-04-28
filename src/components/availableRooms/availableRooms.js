// @ts-nocheck

import React from "react";
import useStyles from "./availableRoomsStyles";

import { UserContext } from "../../contexts/userContext";
import { Container, Grid, List, ListItem, Typography } from "@material-ui/core";

import LockIcon from "@material-ui/icons/Lock";

function AvailableRooms(props) {
	const classes = useStyles();

	const onJoinClick = (event, joinRoom) => {
		joinRoom(event);
		props.changeView(event.target.id);
		props.toggleDrawer();
	};

	const generateFiveUsers = (users) => {
		const newList = users.slice(0, 5);
		return newList.map((user, index) =>
			newList.length - 1 != index ? `${user.name}, ` : `and more... `
		);
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<Container className={classes.mainContainer} maxWidth="sm">
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
										{room.users ? (
											<>
												<Typography className={classes.activeUsers}>
													{room.users.length} : active users
												</Typography>
												{room.users.length != 0 ? (
													<Typography
														className={classes.users}
														style={{ color: room.color }}>
														{room.users.length < 5
															? room.users.map((user, index) =>
																	room.users.length - 1 === index
																		? `${user.name} `
																		: `${user.name}, `
															  )
															: generateFiveUsers(room.users)}
													</Typography>
												) : null}
											</>
										) : null}
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
											{room.users.length < 5
												? room.users.map((user, index) =>
														room.users.length - 1 === index
															? `${user.name} `
															: `${user.name}, `
												  )
												: generateFiveUsers(room.users)}
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
