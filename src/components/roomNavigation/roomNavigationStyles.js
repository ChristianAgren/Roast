import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flexGrow: 1,
		},

		drawerButton: {
			width: "6rem",
			height: "2.5rem",

			background: "#727070",
			margin: "auto",

			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			borderRadius: "0 0 .5rem .5rem",

			"&:hover": {
				background: "#727070",
			},
			"& > *": {
				fontSize: "5rem",
				color: "#ff8866",
			},
		},

		container: {
			padding: 0,
			height: ".5rem",
			background: "#727070",
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

export default useStyles;
