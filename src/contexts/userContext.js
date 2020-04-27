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
			connectedRoomColor: "",
			joinRoom: this.joinRoom,

			chatlog: [],
			createNewMessage: this.createNewMessage,

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
			console.log("data", data);

			this.setState(
				{
					connectedRoom: data.roomId,
					connectedRoomColor: data.roomColor,
				},
				() => console.log(this.state.connectedRoom)
			);
		});
	}

	joinRoom = (event) => {
		event.preventDefault();

		// let roomColorRgb = event.target.style.background;

		const name = this.state.name;
		const roomId = event.target.id;
		const prevRoomId = this.state.connectedRoom;

		const roomColor = event.target.style.background;

		this.setState({
			firstTime: true,
		});

		// emit
		this.state.socket.emit("join room", {
			name,
			roomId,
			prevRoomId,
			roomColor,
		});
	};

	// convert rgb to hex
	// componentToHex = (c) => {
	// 	var hex = c.toString(16);
	// 	return hex.length == 1 ? "0" + hex : hex;
	// };
	// rgb(r, g, b) {
	// 	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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
