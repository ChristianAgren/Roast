// @ts-nocheck
import React from "react";
import useStyles from "./roomNavigationStyles";

import AvailableRooms from "../availableRooms/availableRooms";

import { Container, Collapse, List, ListItem } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function RoomNavigation(props) {
	const [drawer, setDrawer] = React.useState(false);

	const classes = useStyles();

	const toggleDrawer = () => {
		setDrawer(!drawer);
	};

	return (
		<div className={classes.wrapper}>
			<Container maxWidth="md" className={classes.container}>
				<Collapse
					in={drawer}
					timeout="auto"
					unmountOnExit
					className={classes.collapse}>
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
