// @ts-nocheck
import React from "react";
import {
	makeStyles,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Grid,
	Typography,
} from "@material-ui/core";
import MessageHandler from "./messageHandler/messageHandler";
import { UserContext } from "../../contexts/userContext";

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

function ChatRoom() {
	const classes = useStyles();

	const generateShortHand = (name) => {
		return name.slice(0, 2).toUpperCase();
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<div className={classes.chatroomWrapper}>
					<div className={classes.removeScrollbar}>
						<Grid container className={classes.chatWrapper} id="chat">
							{user.chatlog.length > 0 ? (
								user.chatlog.map((msg, index) =>
									msg.client ? (
										<Grid
											item
											xs={12}
											key={`${msg.name}:${index}`}
											style={
												msg.name === user.name
													? { display: "flex", justifyContent: "flex-end" }
													: null
											}>
											<List dense className={classes.msg}>
												<ListItem
													style={{ background: `${user.connectedRoomColor}` }}
													className={
														msg.name === user.name
															? classes.yourMsg
															: classes.clientMsg
													}>
													<ListItemAvatar>
														<Avatar style={{ background: "#4a4949" }}>
															{generateShortHand(msg.name)}
														</Avatar>
													</ListItemAvatar>
													<ListItem className={classes.chatTextWrapper}>
														<Typography variant="h6">{msg.name}</Typography>

														{msg.message.slice(0, 8) === "https://" ? (
															<img
																src={msg.message}
																className={classes.chatImage}></img>
														) : (
															<Typography variant="body2">
																{msg.message}
															</Typography>
														)}
													</ListItem>
												</ListItem>
											</List>
										</Grid>
									) : (
										<Grid item xs={12} key={`${msg.name}:${index}`}>
											<List dense>
												<ListItem>
													<ListItemText
														className={classes.serverMsg}
														secondary={msg.message}
													/>
												</ListItem>
											</List>
										</Grid>
									)
								)
							) : (
								<Typography variant="overline">
									Be the first to send a message!
								</Typography>
							)}
						</Grid>
					</div>

					<MessageHandler user={user} />
				</div>
			)}
		</UserContext.Consumer>
	);
}

export default ChatRoom;
