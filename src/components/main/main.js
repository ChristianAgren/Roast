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
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import SaveIcon from "@material-ui/icons/Save";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
			{(user) => (
				<Container maxWidth="sm">
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
