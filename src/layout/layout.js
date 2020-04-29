// @ts-nocheck
import React from "react";
import useStyles from "./layoutStyles";
import { Container } from "@material-ui/core";
import Main from "../components/main/main";
import ChatRoom from "../components/chatRoom/chatRoom";

import RoomNavigation from "../components/roomNavigation/roomNavigation";
import logo from "./ROAST_logo.png";

function Layout() {
	const classes = useStyles();

	const [changeView, setChangeView] = React.useState(false);

	const handleChangeView = (enteredRoom) => {
		setChangeView(enteredRoom);
	};

	return (
		<Container maxWidth="md" className={classes.container}>
			<RoomNavigation changeView={handleChangeView} />

			<div className={classes.logoContainer}>
				<img src={logo} className={classes.logo} />
			</div>

			{changeView ? <ChatRoom /> : <Main changeView={handleChangeView} />}
		</Container>
	);
}
export default Layout;
