import React from 'react'
import Main from '../components/main/main'
import ChatRoom from '../components/chatRoom/chatRoom'
import RoomNavigation from '../components/roomNavigation/roomNavigation'
import {
    Switch,
    Route
} from "react-router-dom";

function Layout() {
    return (
        <div>
            <RoomNavigation />
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/chatroom">
                    <ChatRoom />
                </Route>
            </Switch>
        </div>
    )
}

export default Layout;