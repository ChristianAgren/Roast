// @ts-nocheck
import React from "react";
import AvailableRooms from "../availableRooms/availableRooms";

import {
	Container,
	// Grid,
	// Paper,
	makeStyles,
	createStyles,
	// Typography,
	// IconButton,
	// Button,
	// SwipeableDrawer,
	Collapse,
	List,
	ListItem,
	// ListItemText,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles((theme, drawer) =>
	createStyles({
		root: {
			flexGrow: 1,
		},

		drawerButton: {
			width: "6rem",
			height: "2.5rem",

			background: "#a7a9b3",
			margin: "auto",

			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			borderRadius: "0 0 .5rem .5rem",
			border: "solid #a7a9b3 0.1rem ",
			borderTop: "solid #a7a9b3 0.2rem",

			"&:hover": {
				background: "#a7a9b3",
			},
			"& > *": {
				fontSize: "3rem",
				color: "#424a6c",
			},
		},

		container: {
			padding: 0,
			height: ".5rem",
			background: "#a1a1a4",
		},
		collapse: {

			background: "#727070",
		},

		wrapper: {
			position: "fixed",
			top: "0",
			left: "0",
			right: "0",
			zIndex: 1,

			display: "flex",
			justifyContent: "center",
		},
	})
);

function RoomNavigation(props) {
	const [drawer, setDrawer] = React.useState(false);

	const classes = useStyles();

	const toggleDrawer = () => {
		setDrawer(!drawer);
	};

	return (
		<div className={classes.wrapper}>
			<Container
				maxWidth="md"
				className={classes.container}
			>
				<Collapse in={drawer} timeout="auto" unmountOnExit className={classes.collapse}>
					<List component="div" disablePadding>
						<AvailableRooms
							changeView={props.changeView}
							toggleDrawer={toggleDrawer}
						/>
					</List>
				</Collapse>

				<ListItem
					button
					onClick={toggleDrawer}
					className={classes.drawerButton}>
					{drawer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</ListItem>
			</Container>
		</div>
	);
}

export default RoomNavigation;
