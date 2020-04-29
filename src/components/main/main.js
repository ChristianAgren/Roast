// @ts-nocheck
import React from "react";
import useStyles from "./mainStyles";

import { UserContext } from "../../contexts/userContext";
import {
	Button,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	List,
	IconButton,
	Input,
	InputAdornment,
	TextField,
	Typography,
	ListItem,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import SaveIcon from "@material-ui/icons/Save";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Modal from "@material-ui/core/Modal";

function Main(props) {
	const classes = useStyles();
	const roomColors = [
		"#ff8866", // sweet red
		"#ff5259", // old ketchup
		"#fdc438", // mustard
		"#ffdc7a", // lemon
		"#eb65bd", // juicy plum
		"#ef7e95", // lavender

		"#2795a0", // stale teal
		"#7a8bff", // not so deep purple
		"#56bff4", // mr.Blueksy
		"#7affce", // faded bud
		"#329e8b", // hedgerow
		"#72c472", // leaf
	];
	const [roomInputValues, setRoomInputValues] = React.useState({
		roomId: "",
		roomPassword: "",
		roomColor: roomColors[0],
		showPassword: false,
	});

	const switchColor = (event) => {
		setRoomInputValues({
			...roomInputValues,
			roomColor: event.target.id,
		});
	};
	

	const [name, setName] = React.useState("");

	const handleNameInputChange = (event) => {
		event.preventDefault();
		setName(event.target.value);
	};

	const handleCreateName = (event, createName, name) => {
		event.preventDefault();
		createName(name);
		props.handleClose();

		props.handleSetFirstTime()
	};

	const handleInputChange = (event, anchor) => {
		setRoomInputValues({
			...roomInputValues,
			[anchor]: event.target.value,
		});
	};

	const handleClickShowPassword = () => {
		setRoomInputValues({
			...roomInputValues,
			showPassword: !roomInputValues.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleCreateRoomClick = (createNewRoom) => {
		const { roomId, roomPassword, roomColor } = roomInputValues;
		createNewRoom({ roomId, roomPassword, roomColor });
		props.changeView(true);
	};

	const handleSwitchColor = (event, switchColor) => {
		switchColor(event);
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<Container maxWidth="sm">
					{props.firstTime && (
						<Modal
							className={classes.modalContainer}
							open={props.open}
							aria-labelledby="create-name-modal"
							aria-describedby="forces user to create a name to chat">
							{
								<FormControl className={classes.createNameContainer}>
									<Typography style={{ color: "White", padding: "2rem" }}>
										Please enter your nickname:
									</Typography>
									<TextField
										size="small"
										id="nameInput"
										type="input"
										focused={true}
										placeholder="Enter your nickname..."
										inputProps={{
											className: classes.createNameInput,
										}}
										variant="outlined"
										className={classes.createNameInput}
										onChange={(event) => handleNameInputChange(event, "name")}
										onKeyPress={
											name.length > 2 && name.length < 11
												? (e) => {
													if (e.key.trim() === "Enter") {
														handleCreateName(e, user.createName, name)
													}
												}
												: null
										}
									/>
									{name !== undefined && name.length > 2 && name.length < 11 ? (
										<Button
											label="name"
											variant="contained"
											color="primary"
											onClick={(e) =>
												handleCreateName(e, user.createName, name)
											}>
											Submit
										</Button>
									) : (
											<Button style={{color:"#fff8"}}disabled variant="contained" color="primary">
												Between 3-10 characters
											</Button>
										)}
								</FormControl>
							}
						</Modal>
					)}

					<Grid container spacing={1} className={classes.mainContainer}>
						<Grid item xs={12}>
							<Typography variant="h3" className={classes.title}>
								ADD NEW ROOM
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="overline">Name *</Typography>
							<FormControl className={classes.roomNameInput}fullWidth>
								<TextField
									helperText="Enter 3-12 characters"
									size="small"
									id="room-name"
									value={roomInputValues.roomID}
									onChange={(event) => handleInputChange(event, "roomId")}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="overline">Password</Typography>
							<div
								style={{
									display: "flex",
								}}>
								{roomInputValues.roomPassword.length !== 0 ? (
									<LockIcon fontSize="large" />
								) : (
										<LockOpenIcon fontSize="large" />
									)}
								<FormControl fullWidth>
									<Input
										size="small"
										id="room-password"
										type={roomInputValues.showPassword ? "text" : "password"}
										style={
											roomInputValues.roomPassword.length !== 0
												? { background: roomInputValues.roomColor }
												: null
										}
										value={roomInputValues.roomPassword}
										onChange={(event) =>
											handleInputChange(event, "roomPassword")
										}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}>
													{roomInputValues.showPassword ? (
														<Visibility />
													) : (
															<VisibilityOff />
														)}
												</IconButton>
											</InputAdornment>
										}
									/>
									<FormHelperText
										style={
											roomInputValues.roomPassword.length !== 0
												? { color: roomInputValues.roomColor }
												: { color: "#b1c0c4" }
										}>
										{roomInputValues.roomPassword.length !== 0
											? "Room will be locked"
											: "Room will be open if left blank"}
									</FormHelperText>
								</FormControl>
							</div>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="overline">Color</Typography>
							<List className={classes.colorWrapper}>
								{roomColors.map((color) => (
									<ListItem
										key={color}
										button
										onClick={(e) => handleSwitchColor(e, switchColor)}
										id={color}
										style={
											color === roomInputValues.roomColor
												? {
													background: color,
													border: ".5rem double #4a4949",
												}
												: {
													background: color,
												}
										}></ListItem>
								))}
							</List>
						</Grid>
						<Grid item xs={12}>
							<Button
								disabled={roomInputValues.roomId.length < 3 || roomInputValues.roomId.length > 12}
								variant="contained"
								color="primary"
								size="large"
								startIcon={<SaveIcon />}
								onClick={() => handleCreateRoomClick(user.createNewRoom)}>
								Create
							</Button>
						</Grid>
					</Grid>
				</Container>
			)}
		</UserContext.Consumer>
	);
}

export default Main;
