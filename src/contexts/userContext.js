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
			availableRooms: {},
			chatlog: [],
			createNewMessage: this.createNewMessage,
			createNewRoom: this.createNewRoom,
			emitTyping: this.emitTyping,
			usersTyping: [],

			firstTime: true,
		};
		this.state.socket.on("connection successful", (data) => this.setAvailableRoomsInState(data))
		this.state.socket.on("join successful", (data) => this.setRoomInState(data));
		this.state.socket.on("chatlog", (data) => this.generateChatLog(data));
		this.state.socket.on("user message", (data) =>
			this.generateChatMessage(data)
		);
		this.state.socket.on("notice", (data) => this.generateChatMessage(data));
		this.state.socket.on("server message", (data) => console.log(data));
		this.state.socket.on("created new room", (data) => this.updateAvailableRooms(data))
		// this.state.socket.on("typing", (data) => this.handleTyping(data));

	}

	setAvailableRoomsInState = (data) => {
		console.log('yaay');
		this.setState({
			availableRooms: data
		}, () => console.log(this.state.availableRooms)
		)
	}

	setRoomInState = (data) => {
		this.setState({
			connectedRoom: data.roomId,
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

	generateChatLog = (serverChat) => {
		const { server_chatlog } = serverChat;
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

	createNewRoom = (roomValues) => {
		this.state.socket.emit("create room", {
			id: roomValues.roomId,
			password: roomValues.roomPassword,
			color: roomValues.roomColor
		})
	}

	updateAvailableRooms = (room) => {
		let updateArray;
		let anchor;

		if (room.password.length != 0) {
			updateArray = [ ...this.state.availableRooms.locked ]
			anchor = 'locked'
		} else {
			updateArray = [ ...this.state.availableRooms.open ]
			anchor = "open"
		}

		updateArray.push(room)
		this.setState({
			availableRooms: {
				...this.state.availableRooms,
				[anchor]: updateArray
			}
		}, () => console.log(this.state.availableRooms))
	}

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
