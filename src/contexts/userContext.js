// @ts-nocheck
import React from "react";
import io from "socket.io-client";

const userSocket = io();

const user = {
	name: "bobo" + Math.floor(Math.random() * 100),
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
			name: user.name,
			socket: user.socket,
			connectedRoom: "",
			joinRoom: this.joinRoom,
			chatlog: [],
			createNewMessage: this.createNewMessage,
			//rooms: [], //rooms array för att uppdatera state på rooms när rummet är tomt
			emitTyping: this.emitTyping,
			usersTyping: [],

			firstTime: true,
		};
		this.state.socket.on("chatlog", (data) => this.generateChatLog(data));

		this.state.socket.on("user message", (data) =>
			this.generateChatMessage(data)
		);
		this.state.socket.on("notice", (data) => this.generateChatMessage(data));

		this.state.socket.on("server message", (data) => console.log(data));

		// this.state.socket.on("typing", (data) => this.handleTyping(data));

		this.state.socket.on("join successful", (data) => {
			console.log("d");

			this.setState(
				{
					connectedRoom: data.roomId,
				},
				() => console.log(this.state.connectedRoom)
			);
		});
	}

	joinRoom = (event) => {
		event.preventDefault();

		const name = this.state.name;
		const roomId = event.target.id;
		const prevRoomId = this.state.connectedRoom;

		this.setState({
			firstTime: true,
		});
		// emit
		this.state.socket.emit("join room", { name, roomId, prevRoomId });
	};

	// Tar bort rummet utan användare i

	// removeRoom = (roomToRemove) => {
	// 	const newRoomList = this.state.rooms.splice(roomToRemove, 1)

	// 	this.setState({
	// 		rooms: newRoomList
	// 	})
	// }

	generateChatLog = (serverChat) => {
		const { server_chatlog } = serverChat;

		console.log(server_chatlog);

		this.setState({
			chatlog: server_chatlog,
		});
	};

	generateChatMessage = (chatMessage) => {
		const chatWindow = document.getElementById("chat");
		const prevContainerHeight = chatWindow.scrollHeight;

		this.setState(
			{
				chatlog: [...this.state.chatlog, chatMessage],
			},
			() => this.scrollToBottom(prevContainerHeight)
		);
	};

	createNewMessage = (messageValue) => {
		this.state.socket.emit("message", {
			roomId: this.state.connectedRoom,
			name: this.state.name,
			message: messageValue,
		});
	};

	// emitTyping = (isTyping) => {
	// 	this.state.socket.emit("typing", {
	// 		name: this.state.name,
	// 		isTyping,
	// 	});
	// };
	handleTyping = (typingUser) => {
		// const found = this.state.usersTyping.find((user) => data. === user);
		// if (!found) {
		// 	if (data.isTyping) {
		// 		this.setState(
		// 			{
		// 				usersTyping: [...this.state.usersTyping, data],
		// 			},
		// 			() => console.log(this.state.usersTyping)
		// 		);
		// 	}
		// }
	};

	scrollToBottom = (prevContainerHeight) => {
		const chatWindow = document.getElementById("chat");

		if (this.state.firstTime) {
			chatWindow.scrollTop = chatWindow.scrollHeight;
			this.setState({
				firstTime: false,
			});
		} else if (
			chatWindow.scrollTop + chatWindow.clientHeight >=
			prevContainerHeight - 75
		) {
			chatWindow.scrollTop = chatWindow.scrollHeight;
		} else {
			//show a clickable notice that takes you to the bottom
		}
	};

	render() {
		return (
			<UserContext.Provider value={this.state}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}
