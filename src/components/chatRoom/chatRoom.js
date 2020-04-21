import React, { useEffect } from 'react'
import io from 'socket.io-client'
const socket = io()

function ChatRoom() {
    let socketId;

    socket.emit('test', 'hej')
    socket.on('socketId', (data) => {     
    })

    
    return (
        <div>
            <p>{socketId}</p>
            <p>Hej</p>
        </div>
    )






}

export default ChatRoom;