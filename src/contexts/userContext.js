// @ts-nocheck
import React from "react";
import io from "socket.io-client";

const userSocket = io();

const user = {
	name: "bob",
	socket: userSocket,
};

export const UserContext = React.createContext({
	name: user.name,
	socket: user.socket,
});

export default class UserProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// name: this.setUserName(),
			socket: user.socket,
			// setUserName: this.setUserName,
			connectedRoom: '',
			joinRoom: this.joinRoom,
			chatlog: [],
			createNewMessage: this.createNewMessage,
		};
		this.state.socket.on("chatlog", (data) => this.generateChatLog(data))
		this.state.socket.on("user message", (data) => this.generateChatLog(data))
		this.state.socket.on("server message", (data) => console.log(data))
	}


	// setUserName = (name) => {
	// 	console.log(name);
	// };

	joinRoom = (event, props) => {
		const name = "bob";
		const roomId = event.target.id;
		const prevRoomId = this.state.connectedRoom
		
		// emit
		this.state.socket.emit("join room", { name, roomId, prevRoomId });
		
		// hey listen
		
		this.state.socket.on("join successful", (data) => {

			this.setState({
				connectedRoom: data.roomId
			})	

			props.changeView(data.roomId);
			props.toggleDrawer();
		});
	};

	generateChatLog = (serverChat) => {
		const { server_chatlog } = serverChat

		this.setState({
			chatlog: server_chatlog
		})
	}

	createNewMessage = (messageValue) => {
		this.state.socket.emit('message', {
			room: this.state.activeRoom,
            message: messageValue
        }) 
	}

	render() {
		return (
			<UserContext.Provider value={this.state}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}
