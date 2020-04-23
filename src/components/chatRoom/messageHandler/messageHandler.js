import React from 'react'
import {
    makeStyles,
    createStyles,
    FormControl,
    TextField,
    Button,
    Container,
} from '@material-ui/core'
import OutdoorGrillTwoToneIcon from '@material-ui/icons/OutdoorGrillTwoTone';
// import { UserContext } from '../../../contexts/userContext'

const useStyles = makeStyles((theme) =>
    createStyles({
        inputMessage: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: theme.spacing(0)
        },
        inputWrapper: {
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem 0',
            '& .MuiInputBase-root': {
                [theme.breakpoints.down('sm')]: {
                    margin: theme.spacing(0, 1, 0, 3)
                },
                [theme.breakpoints.up('sm')]: {
                    margin: theme.spacing(0, 4, 0, 6)
                }
            },
            '& .MuiButton-root': {
                margin: theme.spacing(0, 2, 0, 0)
            }
        }
    })
);

function MessageHandler(props) {
    const classes = useStyles()
    const [messageValue, setMessageValue] = React.useState('')

    const onInputChange = (event) => {
        setMessageValue(event.target.value)
    }

    const onSendClick = (createNewMessage) => {
        // console.log(messageValue);
        createNewMessage(messageValue)
        setMessageValue('')
    }

    return (
        // <UserContext.Consumer>
        //     {(user) => (
        <div className={classes.inputMessage}>
            <Container
                maxWidth="md"
                style={{ background: "#e7e7e7" }}
            >
                <Container
                    maxWidth="sm"
                    className={classes.inputWrapper}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-size-small"
                            placeholder="Send message..."
                            variant="outlined"
                            value={messageValue}
                            size="small"
                            onChange={(event) => onInputChange(event)}
                        />
                    </FormControl>
                    <Button
                        onClick={() => onSendClick(props.user.createNewMessage)}
                        disabled={(messageValue.length === 0)}
                    >
                        <OutdoorGrillTwoToneIcon />
                    </Button>
                </Container>
            </Container>
        </div>
        //     )}
        // </UserContext.Consumer>
    )
}

export default MessageHandler