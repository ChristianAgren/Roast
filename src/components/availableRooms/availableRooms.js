// @ts-nocheck

import React from "react";

import { UserContext } from "../../contexts/userContext";

import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({}));

function AvailableRooms(props) {
	const classes = useStyles();

	return (
		<UserContext.Consumer>
			{(user) => (
				<>
					<p>rooms</p>
					<ul>
						<li
							onClick={(e) => user.joinRoom(e, props)}
							style={{ cursor: "pointer" }}
							id="1">
							hej1
						</li>
					</ul>
					<p>locked rooms</p>
					<ul>
						<li
							onClick={(e) => user.joinRoom(e, props)}
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
