// @ts-nocheck
import React from "react";
import { Container, makeStyles, createStyles } from "@material-ui/core";
import Main from "../components/main/main";
import ChatRoom from "../components/chatRoom/chatRoom";

import ApiTest from "./apiTest";

import RoomNavigation from "../components/roomNavigation/roomNavigation";
import { UserContext } from "../contexts/userContext";
import logo from "./ROAST_logo.png";

const useStyles = makeStyles((theme, drawer) =>
	createStyles({
		logoContainer: {
			position: "absolute",
			top: "2.5rem",
			left: "1rem",

			width: "8rem",
			height: "2rem",

			// background: "#ff8866",
			borderRadius: ".5rem",
		},
		logo: {
			position: "absolute",
			bottom: ".2rem",
			left: ".4rem",

			width: "calc(100% - .8rem)",
			imageRendering: "pixelated",
		},
	})
);

function Layout() {
	const classes = useStyles();

	const [changeView, setChangeView] = React.useState(false);
	const [changeColor, setChangeColor] = React.useState();

	const handleChangeView = (roomId) => {
		setChangeView(roomId);
	};

	const getColorFromChild = (color) => {
		setChangeColor(color);
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<Container
					maxWidth="md"
					style={{
						position: "relative",
						background: "#3e404c",
						padding: "3rem 0",

						height: "100vh",

						display: "flex",
						alignItems: "center",
					}}>
					<RoomNavigation changeView={handleChangeView} />

					<div
						className={classes.logoContainer}
						style={{ background: changeColor }}>
						<img src={logo} className={classes.logo} />
					</div>

					{changeView ? <ChatRoom /> : <Main getColor={getColorFromChild} />}
					{/* <ApiTest /> */}
				</Container>
			)}
		</UserContext.Consumer>
	);
}

export default Layout;
