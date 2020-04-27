// @ts-nocheck
import React from "react";

import {
	Button,
	Container,
	createStyles,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	makeStyles,
	TextField,
	Typography,
	Modal,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import SaveIcon from "@material-ui/icons/Save";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { UserContext } from "../../contexts/userContext";


const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: "center",
			color: theme.palette.text.secondary,
		},
		mainContainer: {
			display: "flex",
			flexDirection: "row",

			paddingBottom: "30%",

			"& .MuiTypography-overline": {
				fontFamily: ' "Quantico", sans-serif',
				fontSize: "1.2rem",
				color: "#3da069",

				lineHeight: "1.2rem",
				letterSpacing: ".1rem",
				padding: theme.spacing(0.8, 0),
			},
			"& .MuiInputBase-root": {
				background: "#99ffc5",
				color: "#456699",
				padding: theme.spacing(0.3, 0, 0, 0.8),
			},
			"& .MuiSvgIcon-root": {
				margin: theme.spacing(1, 2, 1, 1),
				color: "#b1c0c4",
			},
			"& > .MuiGrid-item": {
				margin: theme.spacing(0.5, 0),
				display: "flex",
				flexDirection: "column",
			},
			"& .MuiButton-containedPrimary": {
				backgroundColor: "#0003",
			},
		},
		title: {
			margin: theme.spacing(3, 0, 2, 0),

			color: "#b1c0c4",
			fontFamily: ' "Quantico", sans-serif',
			fontWeight: "bold",

			textAlign: "center",
			letterSpacing: ".06rem",
			[theme.breakpoints.down("xs")]: {
				fontSize: "1.6rem",
			},

			borderBottom: ".2rem solid #5777FF",
		},
	})
);

function Main() {
	const classes = useStyles();
	const [roomInputValues, setRoomInputValues] = React.useState({
		roomId: "",
		roomPassword: "",
		roomColor: "",
		showPassword: false,
	});

	const [firstTimeOnSite, setFirstTimeOnSite] = React.useState({
		firstTime: true,
		name: '',
	})

	const handleCreateName = (event, createName) => {
		event.preventDefault()
		console.log('in: handleFirstTimeOnSite');

		createName(firstTimeOnSite.name)
		setFirstTimeOnSite ({
			firstTimeOnSite: false
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

	const handleNameInputChange = (event) => {
		event.preventDefault();
		setFirstTimeOnSite({
			name: event.target.value
		})
	}

	const handleCreateRoomClick = () => {
		console.log(`Will create room with following:`);
		console.log(`Name: ${roomInputValues.roomId}`);
		console.log(`Password: ${roomInputValues.roomPassword}`);
		console.log(`Color: ${roomInputValues.roomColor}`);
	};

	return (
		<UserContext.Consumer>
			{/* Om första gången på sidan, spara boolean  'firstTimeOnSite' === true visa modal där du skriver in namn
			uppdatera 'user' i localstorage, funktion med onclick som kör createName som uppdaterar state från localstorage user, behövs knapp och inputfält, använd closeAfterTransition
			för att stänga när man skrivit in namn. disableEscapeKeyDown kan behövas för att tvinga att skriva namn. onRendered för att modalen ska sättas till true när man kommer in på sidan första gången*/}
			{(user) => (
				<Container maxWidth="sm">
					{firstTimeOnSite &&
						<FormControl fullWidth>
							<TextField
								size="small"
								id="nameInput"
								type="text"
								onChange={(event) => handleNameInputChange(event, "name")}
							/>
							<Button
								label="name"
								variant="contained"
								color="primary"
								onClick={(e) => handleCreateName(e, user.createName)}
							>
							Send
							</Button>

						</FormControl>
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
									<LockIcon fontSize="large" style={{ color: "#ef7825" }} />
								) : (
										<LockOpenIcon fontSize="large" style={{ color: "#3da069" }} />
									)}
								<FormControl fullWidth>
									<Input
										size="small"
										id="room-password"
										type={roomInputValues.showPassword ? "text" : "password"}
										style={
											roomInputValues.roomPassword.length !== 0
												? { background: "#ef7825" }
												: { background: "#99ffc5" }
										}
										value={roomInputValues.roomPassword}
										onChange={(event) => handleInputChange(event, "roomPassword")}
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
												? { color: "#ef7825" }
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

							<FormControl fullWidth>
								<TextField
									size="small"
									id="room-color"
									value={roomInputValues.roomColor}
									onChange={(event) => handleInputChange(event, "roomColor")}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								startIcon={<SaveIcon />}
								onClick={() => handleCreateRoomClick()}>
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
