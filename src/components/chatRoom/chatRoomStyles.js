import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	chatroomWrapper: {
		position: "relative",
		marginBottom: "1rem",

		height: "100%",
		maxHeight: "calc(100% - 7rem)",

		width: "100%",

		overflow: "hidden",

		"& .MuiGrid-container": {
			display: "block",
		},
		"& .MuiListItemAvatar-root": {
			margin: ".5rem",
			minWidth: "0",
		},
		"& .MuiListItem-gutters": {
			padding: "0 !important",
		},
		"& .MuiList-padding": {
			padding: "0",
			marginTop: theme.spacing(1),
		},
	},

	removeScrollbar: {
		width: "100%",
		height: "100%",

		overflowX: "hidden",
	},

	chatWrapper: {
		overflowY: "scroll",

		height: "100%",
		width: "calc(100% + 34px)",
		paddingRight: "34px",

		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",

		"& > div:last-child": {
			marginBottom: "1rem",
		},
	},

	msg: {
		width: "fit-content",
		maxWidth: "75%",

		wordBreak: "break-all",
		[theme.breakpoints.down(550)]: {
			maxWidth: "100%",
		},

		padding: ".2rem 1rem",

		"& > *": {
			margin: "0",
			display: "flex",
			alignItems: "end",
			borderRadius: ".3rem",
		},
		"& .MuiListItem-root": {
			margin: ".5rem",
		},
		"& .MuiListItem-root h6": {
			textAlign: "left",
		},
		"& .MuiListItem-root p": {
			padding: ".5rem",
		},
	},

	clientMsg: {
		"& .MuiListItem-root p": {
			padding: 0,
			marginRight: ".5rem",
		},
		"& .MuiListItem-root h6": {
			textAlign: "left",
			marginRight: "1rem",
		},
		"& img": {
			marginRight: "-1rem",
		},
	},
	yourMsg: {
		flexDirection: "row-reverse",
		filter: " hue-rotate(20deg)",

		"& .MuiListItem-root h6": {
			display: "none",
		},
	},

	serverMsg: {
		padding: theme.spacing(0.5),
		textAlign: "center",
		borderRadius: theme.shape.borderRadius,
		"& p": {
			color: "#fff4",
		},
	},
	chatTextWrapper: {
		width: "100%",
		padding: "0 1rem",

		display: "flex",
		flexDirection: "column",
		justifyContent: "left",
		alignItems: "end",

		"&  > *": {
			width: "100%",
		},

		"& img": {
			borderRadius: ".2rem",
		},
	},
	roomName: {
		position: "absolute",
		top: "1rem",
		right: ".5rem",

		height: "1.5rem",
		padding: ".2rem .5rem",
		color: "#242020",

		borderRadius: ".5rem",
	},
}));

export default useStyles;
