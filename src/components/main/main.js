// @ts-nocheck
import React from "react";
import { UserContext } from "../../contexts/userContext";
import {
	Button,
	Container,
	createStyles,
	FormControl,
	FormHelperText,
	Grid,
	List,
	IconButton,
	Input,
	InputAdornment,
	makeStyles,
	TextField,
	Typography,
	ListItem,
	withTheme,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import SaveIcon from "@material-ui/icons/Save";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Modal from '@material-ui/core/Modal';


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
			color: "#b1c0c4",

			"& .MuiTypography-overline": {
				fontFamily: ' "Quantico", sans-serif',
				fontSize: "1.2rem",

				lineHeight: "1.2rem",
				letterSpacing: ".1rem",
				padding: theme.spacing(0.8, 0),
			},
			"& .MuiInputBase-root": {
				background: "#b1c0c4",
				padding: theme.spacing(0.3, 0, 0, 0.8),
			},
			"& .MuiSvgIcon-root": {
				margin: theme.spacing(1, 2, 1, 1),
			},
			"& .MuiSvgIcon-root": {
				margin: theme.spacing(0.5),
				color: "rgba(0, 0, 0, 0.45)",
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
			color: "#0005",
			margin: theme.spacing(3, 0, 2, 0),
			textAlign: "center",
			textDecoration: "underline",
			letterSpacing: ".06rem",
			[theme.breakpoints.down("xs")]: {
				fontSize: "1.6rem",
			},
		},
		colorWrapper: {
			display: "flex",
			justifyContent: "center",
			flexWrap: "wrap",

			"& > *": {
				margin: ".5rem",
				width: "4rem",
				height: "4rem",
			},
		},
		modalContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		},
		createNameContainer: {
			display: "flex",
			width: "20rem",
			justifyContent: "center",
			alignItems: 'space-between',
			background: '#224',
			textAlign: 'center'
			
		},
		createNameInput: {
			color: "white"
		},
		
		
	})
);

function Main() {
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
		console.log(event.target.id);

		setRoomInputValues({
			...roomInputValues,
			roomColor: event.target.id,
		});
	};
	const [firstTimeOnSite, setFirstTimeOnSite] = React.useState({
		firstTime: true,
		name: '',
	})

	const handleClose = () => {
		setOpen(false);
	  };

	const [open, setOpen] = React.useState(true);

	const handleCreateName = (event, createName, handleClose) => {
		event.preventDefault()

		handleClose()

		console.log('in: handleFirstTimeOnSite');

		createName(firstTimeOnSite.name)
		setFirstTimeOnSite({
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

	const handleCreateRoomClick = (createNewRoom) => {
		console.log(`Will create room with following:`);
		console.log(`Name: ${roomInputValues.roomId}`);
		console.log(`Password: ${roomInputValues.roomPassword}`);
		console.log(`Color: ${roomInputValues.roomColor}`);

		const { roomId, roomPassword, roomColor } = roomInputValues;
		console.log(roomId, roomPassword, roomColor);

		createNewRoom({ roomId, roomPassword, roomColor });
	};

	  

	return (
		<UserContext.Consumer>
			{/* Om första gången på sidan, spara boolean  'firstTimeOnSite' === true visa modal där du skriver in namn
			uppdatera 'user' i localstorage, funktion med onclick som kör createName som uppdaterar state från localstorage user, behövs knapp och inputfält, använd closeAfterTransition
			för att stänga när man skrivit in namn. disableEscapeKeyDown kan behövas för att tvinga att skriva namn. onRendered för att modalen ska sättas till true när man kommer in på sidan första gången*/}
			{(user) => (
				<Container maxWidth="sm">
					{firstTimeOnSite &&
						<Modal
							className={classes.modalContainer}
							open={open}
							aria-labelledby="create-name-modal"
							aria-describedby="forces user to create a name to chat"
						>
							{<FormControl className={classes.createNameContainer}>
								<Typography style={{color: "White", padding: "2rem"}}>Please enter your nickname:</Typography>
								<TextField
									size="small"
									id="nameInput"
									type="input"
									inputProps={{
										className: classes.createNameInput}}
									variant="outlined"
									className={classes.createNameInput}
									onChange={(event) => handleNameInputChange(event, "name")}
								/>
								<Button
									label="name"
									variant="contained"
									color="primary"
									onClick={(e) => handleCreateName(e, user.createName, handleClose)}
								>
									Send
								</Button>

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
