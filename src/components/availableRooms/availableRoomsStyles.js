import { makeStyles, createStyles } from "@material-ui/core";

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

			"& > *": {
				pointerEvents: "none",
			},
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
export default useStyles;
