// @ts-nocheck
import React from "react";

import {
	makeStyles,
	createStyles,
	Paper,
	Grid,
	Container,
} from "@material-ui/core";

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
	})
);

function Main() {
	const classes = useStyles();

	return (
		<Container maxWidth="md" className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<Paper className={classes.paper}>xs=12 sm=6</Paper>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Paper className={classes.paper}>xs=12 sm=6</Paper>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Paper className={classes.paper}>xs=6 sm=3</Paper>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Paper className={classes.paper}>xs=6 sm=3</Paper>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Paper className={classes.paper}>xs=6 sm=3</Paper>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Paper className={classes.paper}>xs=6 sm=3</Paper>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Main;
