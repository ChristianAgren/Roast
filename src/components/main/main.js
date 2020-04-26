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
			// background:"#ff69b488",

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
				color:"#4a4949",
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

			borderBottom: ".2rem solid #b1c0c4",
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

	const handleCreateRoomClick = () => {
		console.log(`Will create room with following:`);
		console.log(`Name: ${roomInputValues.roomId}`);
		console.log(`Password: ${roomInputValues.roomPassword}`);
		console.log(`Color: ${roomInputValues.roomColor}`);
	};

	return (
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
								style={{
									fontFamily: ' "Quantico", sans-serif',
									color: "#99ffc5",
								}}>
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
	);
}

export default Main;
