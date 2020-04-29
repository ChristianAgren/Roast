import {
	createStyles,
	makeStyles,
} from "@material-ui/core";

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
				[theme.breakpoints.down("xs")]: {
					fontSize: "1rem",
				},
			},
			"& .MuiInputBase-root": {
				background: "#b1c0c4",
				padding: theme.spacing(0.3, 0, 0, 0.8),
			},
			"& .MuiSvgIcon-root": {
				margin: theme.spacing(0.5),
				// color: "rgba(0, 0, 0, 0.45)",
				[theme.breakpoints.down("xs")]: {
					fontSize: "2rem",
				},
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
			margin: theme.spacing(4, 0, 2, 0),
			textAlign: "center",
			textDecoration: "underline",
			letterSpacing: ".06rem",
			[theme.breakpoints.down(376)]: {
				margin: theme.spacing(10, 0, 2, 0)
			},
			[theme.breakpoints.down(321)]: {
				fontSize: "1.8rem",
				margin: theme.spacing(10, 0, 2, 0)
			},
		},
		roomNameInput: {
			"& .MuiFormHelperText-root": {
				color: "#b1c0c4",
			},
		},
		colorWrapper: {
			display: "flex",
			justifyContent: "center",
			flexWrap: "wrap",
			"& .MuiListItem-gutters": {
				padding: 0,
			},


			"& > *": {
				margin: ".5rem",
				width: "4rem",
				height: "4rem",
				[theme.breakpoints.between(361, "xs")]: {
					margin: ".2rem",
					width: "3rem",
					height: "3rem",
				},
				[theme.breakpoints.down(361)]: {
					margin: ".2rem",
					width: "2rem",
					height: "2rem",
					
				},

			},

		},
		modalContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		},
		createNameContainer: {
			display: "flex",
			width: "20rem",
			justifyContent: "center",
			alignItems: 'space-between',
			background: '#224',
			textAlign: 'center'

		},
		createNameInput: {
			color: "white"
		},


	})
);

export default useStyles
