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
		snackbar: {
			marginBottom: "3rem",
			padding: "0",

			width: "100%",
			borderRadius: "0",

			display: "block",

			"& >* ": {
				padding: "0",
				paddingLeft: ".5rem",

				borderRadius: "0",
				boxShadow: "none",
				background: "#555",
				color: "#e7e7e7",

				fontSize: ".7rem",
			},
		},
		isTyping: {
			position: "absolute",
			top: "-1.5rem",
			left: 0,
			right:0,

			padding: "0 1rem",

			background: "#000a",
			color: "#fff9",
		},
	})
);

function MessageHandler(props) {
	const classes = useStyles();

	// console.log("props", props.user.usersTyping);

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
