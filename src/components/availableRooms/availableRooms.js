import React from "react";
import useStyles from './availableRoomsStyles'
import { UserContext } from "../../contexts/userContext";
import {
	Button,
	Container,
	FormControl,
	Grid,
	List,
	ListItem,
	TextField,
	Typography,
	Modal,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

function AvailableRooms(props) {
	const classes = useStyles();
	const [passwordOpen, setPasswordOpen] = React.useState(false)
	const [passwordInput, setPasswordInput] = React.useState({
		room: '',
		pwInput: '',
		error: false,
		errMsg: ''
	})

	const handlePasswordInputChange = (event) => {
		setPasswordInput({
			...passwordInput,
			pwInput: event.target.value,
			error: false,
			errMsg: ''
		})
	}

	const handlePasswordOpen = (event, value) => {
		if (event !== "close") {
			setPasswordInput({
				...passwordInput,
				room: event.target.id
			})
		}
		setPasswordOpen(value)
	}

	const onJoinClick = (event, joinRoom) => {
		joinRoom(event);
		props.changeView(true);
		props.toggleDrawer();
	};

	const generateFiveUsers = (users) => {
		const newList = users.slice(0, 5)
		return (
			newList.map((user, index) =>
				newList.length - 1 !== index
					? `${user.name}, `
					: `and more... `
			)
		)
	}

	const shouldGiveAccess = (user, inputs) => {
		let shouldEnter = false
		const room = user.availableRooms.locked.find((r) => r.id === inputs.room)
		if (room) {
			shouldEnter = validatePassword(room, inputs)
		} else {
			setPasswordInput({
				...passwordInput,
				errMsg: 'Could not find room'
			})
		}

		if (!shouldEnter) {
			setPasswordInput({
				...passwordInput,
				error: true,
				errMsg: 'Invalid password'
			})
		} else {
			setPasswordInput({
				...passwordInput,
				error: false,
				errMsg: ''
			})
			props.changeView(true)
			handlePasswordOpen("close", false)
			user.joinRoom('lock', { id: inputs.room })
		}
	}

	const validatePassword = (room, inputs) => {
		return room.password === inputs.pwInput
	}

	return (
		<UserContext.Consumer>
			{(user) => (
				<>	
					<Container className={classes.mainContainer} maxWidth="sm">
						<Typography variant="overline">Open rooms</Typography>
						<div className={classes.hideRoomOverFlow}>
							<Grid container className={classes.roomsContainer}>
								<List dense>
									{user.availableRooms.open.map((room) => (
										<ListItem
											button
											id={room.id}
											onClick={(e) => onJoinClick(e, user.joinRoom)}
											key={`${room.id}:${room.name}`}
											style={{ background: room.color }}
											className={classes.room}>
											<div className={classes.cutout}></div>

											<Typography>
												{room.name}
												<em style={{ color: "#0008" }}>{room.id}</em>
											</Typography>
											{(room.users) ?
												<>
													<Typography className={classes.activeUsers}>
														{room.users.length} : active users
													</Typography>
													{(room.users.length !== 0) ?
														<Typography
															className={classes.users}
															style={{ color: room.color }}>
															{room.users.length < 5 ?
																room.users.map((user, index) =>
																	room.users.length - 1 === index
																		? `${user.name} `
																		: `${user.name}, `
																)
																: generateFiveUsers(room.users)
															}
														</Typography>
														: null
													}
												</>
												: null
											}

										</ListItem>
									))}
								</List>
							</Grid>
						</div>

						<Typography variant="overline">Locked rooms</Typography>
						<div className={classes.hideRoomOverFlow}>
							<Grid container className={classes.roomsContainer}>
								<List dense>
									{user.availableRooms.locked.map((room) => (
										<ListItem
											button
											onClick={(event) => handlePasswordOpen(event, true)}
											id={room.id}
											key={`${room.id}:${room.name}`}
											style={{ background: room.color }}
											className={classes.room}>
											<div className={classes.cutout}>
												<LockIcon style={{ color: room.color }} />
											</div>

											<Typography>
												{room.name}
												<em style={{ color: "#0008" }}>{room.id}</em>
											</Typography>
											<Typography className={classes.activeUsers}>
												{room.users.length} : active users
											</Typography>

											<Typography
												className={classes.users}
												style={{ color: room.color }}>
												{room.users.length < 5 ?
													room.users.map((user, index) =>
														room.users.length - 1 === index
															? `${user.name} `
															: `${user.name}, `
													)
													: generateFiveUsers(room.users)
												}
											</Typography>
										</ListItem>
									))}
								</List>
							</Grid>
						</div>
					</Container>
					<Modal
						open={passwordOpen}
						aria-labelledby="password-modal"
						aria-describedby="forces user to input a password for a chat"
						className={classes.passwordModal}
					>
						{<FormControl>
							<Typography variant="h6" >Password protected</Typography>
							<Typography variant="subtitle2">{`This room is password protected.\nPlease enter the password below...`}</Typography>
							<TextField
								size="small"
								id="passwordInput"
								error={passwordInput.error}
								type="input"
								variant="outlined"
								value={passwordInput.pwInput}
								onChange={(event) => handlePasswordInputChange(event)}
								helperText={passwordInput.errMsg}
							/>
							<div className={classes.passBtnContainer}>
								<Button
									label="send"
									variant="contained"
									color="primary"
									onClick={() => shouldGiveAccess(user, passwordInput)}
								>
									Join room
										</Button>
								<Button
									label="send"
									variant="contained"
									color="default"
									onClick={() => handlePasswordOpen("close", false)}
								>
									Close
										</Button>
							</div>

						</FormControl>}
					</Modal>
				</>

			)}
		</UserContext.Consumer>
	);
}

export default AvailableRooms;
