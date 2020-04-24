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
		overflow: "hidden",
		maxHeight: "calc(100% - 5rem)",

		"& .MuiGrid-container": {
			display: "block",
		},
	},

    removeScrollbar: {
        width:"100%",
        height: "100%",


        overflowX:"hidden"
    },

	chatWrapper: {
		overflowY: "scroll",

        height: "100%",
        width:"calc(100% + 34px)",
        paddingRight:"34px"
	},

	clientMsg: {
		background: theme.palette.background.paper,
		padding: theme.spacing(1),
		borderRadius: theme.shape.borderRadius,
	},
	serverMsg: {
		padding: theme.spacing(0),
		borderRadius: theme.shape.borderRadius,
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
									<Grid item xs={12} key={`${msg.name}:${index}`}>
										<List dense>
											<ListItem>
												<ListItemAvatar>
													<Avatar>{generateShortHand(msg.name)}</Avatar>
												</ListItemAvatar>
												<ListItemText
													className={classes.clientMsg}
													primary={msg.name}
													secondary={msg.message}
												/>
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
													// secondary={
													// 	<Typography variant="overline">
													// 		{msg.message}
													// 	</Typography>
													// }
												/>
											</ListItem>
										</List>
									</Grid>
								)
							)
						) : (
							<Typography variant="h6">
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
