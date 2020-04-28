// @ts-nocheck
import React from "react";
import {
	makeStyles,
	createStyles,
	FormControl,
	TextField,
	Button,
	Container,
	Snackbar,
	Fade,
	Typography,
} from "@material-ui/core";
import OutdoorGrillTwoToneIcon from "@material-ui/icons/OutdoorGrillTwoTone";

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

function MessageHandler(props) {
	const classes = useStyles();

	const [messageValue, setMessageValue] = React.useState("");

	const onInputChange = (event, props) => {
		let isTyping = event.target.value.length > 0;
		setMessageValue(event.target.value);

		props.user.emitTyping(isTyping);
	};

	const onSendClick = (createNewMessage, invalidRequest) => {
		const key = "017OsVu1S3JfdgoAgGOSlyvqt0f1iDsT";

		if (messageValue.slice(0, 5) === "/gif " && messageValue.length > 5) {
			let searchword = messageValue
				.slice(5, messageValue.length)
				.toString()
				.trim();
			console.log("make GIPHY request on:", searchword);

			fetch(
				`https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=${searchword}&limit=1`
			)
				.then((response) => response.json())
				.then((content) => {
					console.log(content);

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
		<div className={classes.inputMessage}>
			<Container
				class="messageHandler"
				maxWidth="md"
				style={{ position: "relative", background: "#e7e7e7" }}>
				{props.user.usersTyping.length > 0 ? (
					<Typography className={classes.isTyping}>
						{props.user.usersTyping.map((user) =>
							user.isTyping ? user.name : null
						)}
						<em style={{ fontSize: ".7rem" }}>: is typing</em>
					</Typography>
				) : null}
				<Container maxWidth="sm" className={classes.inputWrapper}>
					<FormControl fullWidth focused={true}>
						<TextField
							// focused={true}
							id="outlined-size-small"
							placeholder="Send message..."
							variant="outlined"
							value={messageValue}
							size="small"
							autoComplete="off"
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
	);
}

export default MessageHandler;
