import {
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	chatroomWrapper: {
		position: "relative",

		height: "100%",
		width: "100%",
		overflow: "hidden",
		maxHeight: "calc(100% - 5rem)",

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
		maxWidth: "75%",
		paddingLeft: " 1rem",

		"& > *": {
			display: "flex",
			alignItems: "end",
			borderRadius: "1.8rem",
		},
	},

	clientMsg: {},
	yourMsg: {
		
		flexDirection: "row-reverse",
		filter: " hue-rotate(20deg)",
		overflow: "hidden",


		"& .MuiListItemText-multiline": {
			textAlign: "left",
			marginLeft: theme.spacing(2),
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
}));

export default useStyles