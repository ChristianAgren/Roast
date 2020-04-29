// @ts-nocheck
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			position: "relative",
			background: "#3e404ccc",

			height: "100vh",

			display: "flex",
			alignItems: "center",
		},

		logoContainer: {
			position: "absolute",
			top: "3rem",
			left: "3rem",

			width: "8rem",
			height: "2rem",

			background:"#ff8866",
			borderRadius: ".5rem",
			[theme.breakpoints.down("xs")]: {
				width: "6rem",
				height: "1.5rem",
				left: "0.5rem",
				top: "1rem",
			},
		},
		logo: {
			position: "absolute",
			bottom: ".2rem",
			left: ".4rem",

			width: "calc(100% - .8rem)",
			imageRendering: "pixelated",

			[theme.breakpoints.down("xs")]: {
				width: "calc(100% - 1.2rem)",
			},
		},
	})
);

export default useStyles;
