// @ts-nocheck
import React from "react";
import useStyles from "./chatRoomStyles";
import {
	Button,
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
												<List
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
												</List>
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
