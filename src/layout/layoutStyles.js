import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			position: "relative",
			background: "#3e404c",
			padding: "3rem 0",

			height: "100vh",

			display: "flex",
			alignItems: "center",
		},

		logoContainer: {
			position: "absolute",
			top: "2.5rem",
			left: "1rem",

			width: "8rem",
			height: "2rem",

			background: "#ff8866",
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

export default useStyles;
