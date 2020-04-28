// @ts-nocheck
import React from "react";
import useStyles from './messageHandlerStyles'
import {
	FormControl,
	TextField,
	Button,
	Container,
	Snackbar,
	Fade,
	Typography,
} from "@material-ui/core";
import OutdoorGrillTwoToneIcon from "@material-ui/icons/OutdoorGrillTwoTone";

function MessageHandler(props) {

	const classes = useStyles();

	const [messageValue, setMessageValue] = React.useState("");

	const onInputChange = (event, props) => {
		let isTyping = event.target.value.length > 0;

		setMessageValue(event.target.value);

		props.user.emitTyping(isTyping);
	};

	const onSendClick = (createNewMessage) => {
		handleClose();

		createNewMessage(messageValue);
		setMessageValue("");
		props.user.emitTyping(false);
	};

	const [state, setState] = React.useState({
		open: false,
		Transition: Fade,
	});

	const handleClick = () => {
		setState({
			open: true,
		});
	};

	const handleClose = () => {
		setState({
			...state,
			open: false,
		});
	};

	return (
		<div className={classes.inputMessage}>
			<Snackbar
				open={state.open}
				onClose={handleClose}
				TransitionComponent={state.Transition}
				message={
					props.user.usersTyping.length > 0 ? (
						<Typography
							onChange={() => {
								if (props.user.usersTyping) {
									handleClick();
								} else {
									handleClose();
								}
							}}>
							{props.user.usersTyping.map((user) =>
								user.isTyping ? user.name : null
							)}
							: is typing
						</Typography>
					) : null
				}
				className={classes.snackbar}
			/>

			<Container
				maxWidth="md"
				style={{ position: "relative", background: "#e7e7e7" }}>
				{props.user.usersTyping.length > 0 ? (
					<Typography
						className={classes.isTyping}
						onChange={() => {
							if (props.user.usersTyping) {
								handleClick();
							} else {
								handleClose();
							}
						}}>
						{props.user.usersTyping.map((user) =>
							user.isTyping ? user.name : null
						)}
						: is typing
					</Typography>
				) : null}
				<Container maxWidth="sm" className={classes.inputWrapper}>
					<FormControl fullWidth>
						<TextField
							id="outlined-size-small"
							placeholder="Send message..."
							variant="outlined"
							value={messageValue}
							size="small"
							autoComplete="off"
							onChange={(event) => onInputChange(event, props)}
						/>
					</FormControl>
					<Button
						onClick={() => onSendClick(props.user.createNewMessage)}
						disabled={messageValue.length === 0}>
						<OutdoorGrillTwoToneIcon />
					</Button>
				</Container>
			</Container>
		</div>
	);
}

export default MessageHandler;
