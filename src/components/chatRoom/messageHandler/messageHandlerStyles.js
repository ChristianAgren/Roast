import {
	makeStyles,
	createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
	createStyles({
		inputMessage: {
			position: "fixed",
			bottom: 0,
			left: 0,
			right: 0,
			padding: theme.spacing(0),
		},
		inputWrapperContainer: {
			background: "#727070",
		},
		inputWrapper: {
			display: "flex",
			justifyContent: "center",
			padding: "1rem 0",
			"& .MuiInputBase-root": {
				[theme.breakpoints.down("sm")]: {
					margin: theme.spacing(0, 1, 0, 3),
				},
				[theme.breakpoints.up("sm")]: {
					margin: theme.spacing(0, 4, 0, 6),
				},
			},
			"& .MuiButton-root": {
				margin: theme.spacing(0, 2, 0, 0),
			},
		},
		isTyping: {
			position: "absolute",
			top: "-1.5rem",
			left: 0,
			right: 0,

			padding: "0 1rem",

			background: "#000a",
			color: "#fff9",
		},
	})
);

export default useStyles;
