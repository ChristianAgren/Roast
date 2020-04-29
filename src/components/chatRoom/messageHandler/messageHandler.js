// @ts-nocheck
import React from "react";
import useStyles from "./messageHandlerStyles";

import {
	FormControl,
	TextField,
	Button,
	Container,
	Typography,
} from "@material-ui/core";
import OutdoorGrillTwoToneIcon from "@material-ui/icons/OutdoorGrillTwoTone";
import { UserContext } from "../../../contexts/userContext";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

function MessageHandler(props) {
	const classes = useStyles();

	const [messageValue, setMessageValue] = React.useState("");

	const onInputChange = (event, props) => {
		let isTyping = event.target.value.length > 0;
		setMessageValue(event.target.value);

		props.user.emitTyping(isTyping);
	};

	const handleClickLeave = (leaveChatRoom) => {
		leaveChatRoom();
		props.changeView(false);
	};

	const onSendClick = (createNewMessage, invalidRequest) => {
		const key = "017OsVu1S3JfdgoAgGOSlyvqt0f1iDsT";

		if (messageValue.slice(0, 5) === "/gif " && messageValue.length > 5) {
			let searchword = messageValue
				.slice(5, messageValue.length)
				.toString()
				.trim();

			fetch(
				`https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=${searchword}&limit=1`
			)
				.then((response) => response.json())
				.then((content) => {
					createNewMessage(content.data.images.downsized.url);
				})
				.catch((err) => {
					invalidRequest(err);
				});
		} else if (
			messageValue.slice(0, 9) === "/sticker " &&
			messageValue.length > 9
		) {
			let searchword = messageValue
				.slice(9, messageValue.length)
				.toString()
				.trim();
			console.log("make GIPHY request on:", searchword);

			fetch(
				`https://api.giphy.com/v1/stickers/random?api_key=${key}&tag=${searchword}&limit=1`
			)
				.then((response) => response.json())
				.then((content) => {
					createNewMessage(content.data.images.downsized.url);
				})
				.catch((err) => {
					invalidRequest(err);
				});
		} else {
			createNewMessage(messageValue);
		}
		setMessageValue("");
		props.user.emitTyping(false);
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<div className={classes.inputMessage}>
					<Container
						maxWidth="md"
						style={{ position: "relative", background: "#727070" }}>
						{props.user.usersTyping.length > 0 ? (
							<Typography className={classes.isTyping}>
								{props.user.usersTyping.map((user) =>
									user.isTyping ? user.name : null
								)}
								<em style={{ fontSize: ".7rem" }}>: is typing</em>
							</Typography>
						) : null}
						<Container maxWidth="sm" className={classes.inputWrapper}>
							<Button onClick={() => handleClickLeave(user.leaveChatRoom)}>
								<MeetingRoomIcon style={{color:"#242020"}}/>
							</Button>
							<FormControl fullWidth focused={true}>
								<TextField
									id="outlined-size-small"
									placeholder="Send message..."
									variant="outlined"
									value={messageValue}
									size="small"
									autoComplete="off"
									autoFocus={true}
									onChange={(event) => onInputChange(event, props)}
									onKeyPress={
										messageValue.length === 0
											? null
											: (e) => {
													if (e.key.trim() === "Enter") {
														onSendClick(
															props.user.createNewMessage,
															props.user.invalidRequest
														);
													}
											  }
									}
								/>
							</FormControl>
							<Button
								style={messageValue.length === 0 ? null : { color: "#ff8866" }}
								onClick={() =>
									onSendClick(
										props.user.createNewMessage,
										props.user.invalidRequest
									)
								}
								disabled={messageValue.length === 0}>
								<OutdoorGrillTwoToneIcon />
							</Button>
						</Container>
					</Container>
				</div>
			)}
		</UserContext.Consumer>
	);
}

export default MessageHandler;
