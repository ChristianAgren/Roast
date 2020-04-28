import {
	makeStyles,
	createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
createStyles({
    mainContainer: {
        padding: theme.spacing(1.5, 0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    hideRoomOverFlow: {
        width: "100%",
        overflowX: "hidden",
        overflowY: "auto",
    },
    roomsContainer: {
        display: "flex",
        flexDirection: "column",
        maxHeight: "35vh",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        padding: theme.spacing(1),
    },
    openIcon: {
        color: "green",
        margin: theme.spacing(1, 2.5, 1, 1),
    },

    room: {
        position: "relative",

        margin: theme.spacing(1, 0, 4, 0),
        padding: theme.spacing(0.5, 0.5),
        borderRadius: "50rem",

        display: "flex",

        "& > *": {
            pointerEvents: "none",
        },
    },

    cutout: {
        width: "1.5rem",
        height: "1.5rem",

        background: "#727070 !important",
        borderRadius: "10rem",

        marginRight: theme.spacing(2),

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& > *": {
            fontSize: "100%",
        },
    },
    activeUsers: {
        marginLeft: "auto",
        marginRight: "2rem",
    },
    users: {
        position: "absolute",
        top: theme.spacing(4),
        left: theme.spacing(2),

        fontStyle: "italic",

        [theme.breakpoints.down(300)]: {
            display: "none",
        },
    },
    passwordModal: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > .MuiFormControl-root': {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '.4rem',
            background: '#224',
            padding: theme.spacing(1),
            width: '30rem',
            height: '20rem',
            color: 'white',
            textAlign: 'center',
            [theme.breakpoints.down("xs")]: {
                width: '80%',
                height: '60%'
            },
            '& .MuiTypography-root': {
                margin: theme.spacing(2, 1),
                maxWidth: '20rem'
            },
            '& .MuiFormControl-root': {
                '& .MuiInputBase-root': {
                    color: 'white',
                    backgroundColor: '#fff1'
                },
                position: 'absolute',
                bottom: '8rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                maxWidth: '20rem',
            },
        }
    },
    passBtnContainer: {
        position: 'absolute',
        bottom: '2.5rem',
        left: 0,
        right: 0,
        '& .MuiButton-root': {
            width: '7rem'
        },
        display: 'flex',
        justifyContent: 'space-evenly',
    }
})
);
export default useStyles