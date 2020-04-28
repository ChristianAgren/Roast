// @ts-nocheck
import React from "react";
import useStyles from './layoutStyles'
import {
	Container,
} from "@material-ui/core";
import Main from "../components/main/main";
import ChatRoom from "../components/chatRoom/chatRoom";
import RoomNavigation from "../components/roomNavigation/roomNavigation";
import logo from "./ROAST_logo.png";

const useStyles = makeStyles((theme, drawer) =>
	createStyles({
		logoContainer: {
			position: "absolute",
			top: "2.5rem",
			left: "1rem",

			width: "8rem",
			height: "2rem",

			background: "#ff8866",
			borderRadius: ".5rem",
			[theme.breakpoints.down("xs")]: {
				width: "6rem",
				height: "1.5rem",
				top: "3rem",
			},
		},
		logo: {
			position: "absolute",
			bottom: ".2rem",
			left: ".4rem",

			width: "calc(100% - .8rem)",
			imageRendering: "pixelated",
			[theme.breakpoints.down("xs")]: {
				width: "calc(100% - 0.8rem)",
			},
		},
	})
);

function Layout() {
	const classes = useStyles();

	const [changeView, setChangeView] = React.useState(false);

	const handleChangeView = (enteredRoom) => {
		setChangeView(enteredRoom);
	};

	return (
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

			<div className={classes.logoContainer}>
				<img src={logo} alt="roast_logotype" className={classes.logo} />
			</div>

			{changeView ? <ChatRoom /> : <Main changeView={handleChangeView} />}
		</Container>
	);
}

export default Layout;
