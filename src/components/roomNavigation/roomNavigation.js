// @ts-nocheck
import React from "react";
import AvailableRooms from "../availableRooms/availableRooms";

import {
	Container,
	Grid,
	Paper,
	makeStyles,
	createStyles,
	Typography,
	IconButton,
	Button,
	SwipeableDrawer,
	Collapse,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},

		drawer: {
			// height: "3rem",

			display: "flex",
			alignItems: "center",
			justifyContent: "center",

			"& > *": {},
		},
		wrapper: {
			position: "fixed",
			top: "0",
			left: "0",
			right: "0",

			background: "#e7e7e7",
		},
	})
);

function RoomNavigation(props) {
	const classes = useStyles();

	const [drawer, setDrawer] = React.useState(false);

	const toggleDrawer = () => {
		setDrawer(!drawer);
	};

	return (
				<div className={classes.wrapper}>
					<Collapse in={drawer} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<AvailableRooms
								switchRoom={props.switchRoom}
								toggleDrawer={toggleDrawer}
							/>
						</List>
					</Collapse>
					<ListItem button onClick={toggleDrawer} className={classes.drawer}>
						{drawer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</ListItem>
				</div>
	);
}

export default RoomNavigation;
