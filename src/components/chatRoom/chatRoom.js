// @ts-nocheck
import React from 'react';
import { 
    makeStyles, 
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Grid,
    Typography
} from '@material-ui/core';
import MessageHandler from './messageHandler/messageHandler'
import { UserContext } from '../../contexts/userContext'

const useStyles = makeStyles((theme) => ({
    chatroomWrapper: {
        position: 'relative'
    },
    chatroomMsg: {
        background: theme.palette.background.paper,
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius
    }
}));



function ChatRoom() {
    const classes = useStyles();


    const generateShortHand = (name) => {
        return name.slice(0, 2).toUpperCase()
    }

    return (
        <UserContext.Consumer>
            {(user) => (
                <div className={classes.chatroomWrapper}>
                    <Grid container>
                        {(user.chatlog.length > 0) ?
                                user.chatlog.map((msg, index) =>
                                    <Grid item xs={12} key={`${msg.name}:${index}`}>
                                        <List dense>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {generateShortHand(msg.name)}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    className={classes.chatroomMsg}
                                                    primary={msg.name}
                                                    secondary={msg.message}
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                )
                                : <Typography variant="h5">Be the first to send a message!</Typography>
                        }
                    </Grid>
                    <MessageHandler user={user} />
                </div>
            )}
        </UserContext.Consumer>
    )
}

export default ChatRoom;