// @ts-nocheck
import React from "react";
import { UserContext } from "../../contexts/userContext";
import useStyles from "./mainStyles"
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
import Modal from '@material-ui/core/Modal';

function Main(props) {
	const classes = useStyles();
	const roomColors = [
		"#ff8866",
		"#ffdc7a",

		"#56bff4",
		"#7a8bff",

		"#7affce",
		"#eb65bd",

		"#ff5259",
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
	const [firstTime, setFirstTime] = React.useState(true)

	const [name, setName] = React.useState('')



	const handleClose = () => {
		setOpen(false);
	};

	const [open, setOpen] = React.useState(true);

	const handleNameInputChange = (event) => {
		event.preventDefault();
		setName(
			event.target.value
		)

	}

	const handleCreateName = (event, createName, handleClose, name) => {
		event.preventDefault()
		createName(name)
		handleClose()

		setFirstTime({
			firstTime: false,
		})
	}


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
		props.changeView(true)
	};

	return (
		<UserContext.Consumer>
			{/* Om första gången på sidan, spara boolean  'firstTimeOnSite' === true visa modal där du skriver in namn
			uppdatera 'user' i localstorage, funktion med onclick som kör createName som uppdaterar state från localstorage user, behövs knapp och inputfält, använd closeAfterTransition
			för att stänga när man skrivit in namn. disableEscapeKeyDown kan behövas för att tvinga att skriva namn. onRendered för att modalen ska sättas till true när man kommer in på sidan första gången*/}
			{(user) => (
				<Container maxWidth="sm">
					{firstTime &&
						<Modal
							className={classes.modalContainer}
							open={open}
							aria-labelledby="create-name-modal"
							aria-describedby="forces user to create a name to chat"
						>
							{<FormControl 
								className={classes.createNameContainer}
							>
								<Typography style={{color: "White", padding: "2rem"}}>Please enter your nickname:</Typography>
								<TextField
									size="small"
									id="nameInput"
									type="input"
									focused={true}
									placeholder="Enter your nickname..."
									inputProps={{
										className: classes.createNameInput
									}}
									variant="outlined"
									className={classes.createNameInput}
									onChange={(event) => handleNameInputChange(event, "name")}
								/>
								{name !== undefined && name.length > 2
									?
									<Button
										label="name"
										variant="contained"
										color="primary"
										onClick={(e) => handleCreateName(e, user.createName, handleClose, name)}
									>
										Submit
									</Button>
									:
									<Button
										disabled
										variant="contained"
										color="primary"

									>
										Submit
							 		</Button>
								}
							</FormControl>}
						</Modal>

					}


					<Grid container spacing={1} className={classes.mainContainer}>
						<Grid item xs={12}>
							<Typography variant="h3" className={classes.title}>
								ADD NEW ROOM
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="overline">Name *</Typography>
							<FormControl fullWidth>
								<TextField
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
												? { background: "#ff8866" }
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
												? { color: "#ff8866" }
												: { color: "#99ffc5" }
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
										onClick={(e) => switchColor(e)}
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
