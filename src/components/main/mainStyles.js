import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: "center",
			color: theme.palette.text.secondary,
		},
		mainContainer: {
			display: "flex",
			flexDirection: "row",
			color: "#b1c0c4",

			"& .MuiTypography-overline": {
				fontFamily: ' "Quantico", sans-serif',
				fontSize: "1.2rem",

				lineHeight: "1.2rem",
				letterSpacing: ".1rem",
				padding: theme.spacing(0.8, 0),
			},
			"& .MuiInputBase-root": {
				background: "#b1c0c4",
				padding: theme.spacing(0.3, 0, 0, 0.8),
			},
			"& .MuiSvgIcon-root": {
				margin: theme.spacing(1, 2, 1, 1),
			},
			"& > .MuiGrid-item": {
				margin: theme.spacing(0.5, 0),
				display: "flex",
				flexDirection: "column",
			},
			"& .MuiButton-containedPrimary": {
				backgroundColor: "#0003",
			},
		},
		title: {
			color: "#0005",
			margin: theme.spacing(3, 0, 2, 0),
			textAlign: "center",
			textDecoration: "underline",
			letterSpacing: ".06rem",
			[theme.breakpoints.down("xs")]: {
				fontSize: "1.6rem",
			},
		},
		colorWrapper: {
			display: "flex",
			justifyContent: "center",
			flexWrap: "wrap",

			"& > *": {
				margin: ".5rem",
				width: "4rem",
				height: "4rem",
			},
		},
		modalContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		createNameContainer: {
			display: "flex",
			width: "20rem",
			justifyContent: "center",
			alignItems: "space-between",
			background: "#224",
			textAlign: "center",
		},
		createNameInput: {
			color: "white",
		},
	})
);

export default useStyles;
