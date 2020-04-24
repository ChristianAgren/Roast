// @ts-nocheck

import React from "react";

import { UserContext } from "../../contexts/userContext";

// import { makeStyles, createStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => createStyles({}));

function AvailableRooms(props) {
	// const classes = useStyles();

	const onJoinClick = (event, joinRoom) => {
		joinRoom(event);

		props.changeView(event.target.id);
		props.toggleDrawer();
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<>
					<p>rooms</p>
					<ul>
						<li
							onClick={(e) => onJoinClick(e, user.joinRoom)}
							style={{ cursor: "pointer" }}
							id="1">
							hej1
						</li>
					</ul>
					<p>locked rooms</p>
					<ul>
						<li
							onClick={(e) => onJoinClick(e, user.joinRoom)}
							style={{ cursor: "pointer" }}
							id="2">
							då1
						</li>
					</ul>
				</>
			)}
		</UserContext.Consumer>
	);
}

export default AvailableRooms;
