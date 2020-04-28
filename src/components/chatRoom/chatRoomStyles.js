import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	chatroomWrapper: {
		position: "relative",

		height: "100%",
		maxHeight: "calc(100% - 5rem)",
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
	},

	msg: {
		width: "fit-content",
		maxWidth: "75%",

		padding: ".2rem 1rem",

		"& > *": {
			display: "flex",
			alignItems: "end",
			borderRadius: "1.8rem",
		},
		"& .MuiListItem-root": {
			margin: ".5rem",
		},
		"& .MuiListItem-root h6": {
			marginTop: "-.5rem",
		},
	},

	clientMsg: {
		"& img": {
			marginRight: "-1rem",
			border: "1px solid red",
		},
	},
	yourMsg: {
		flexDirection: "row-reverse",
		filter: " hue-rotate(20deg)",

		"& .MuiListItem-root,": {
			// margin: ".2rem 0 .5rem .5rem",
		},
		"& .MuiListItem-root > *": {
			textAlign: "right",
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
			borderRadius: "1.5rem",
		},
	},
}));

export default useStyles;
