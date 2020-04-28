// @ts-nocheck
import React from "react";
import io from "socket.io-client";

const userSocket = io("http://localhost:8080");

const user = {
	name: "",
	socket: userSocket,
};

export const UserContext = React.createContext({
	name: "",
	socket: user.socket,
});

export default class UserProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			socket: user.socket,

			connectedRoom: "",
			connectedRoomColor: "",
			joinRoom: this.joinRoom,
			createName: this.createName,
			availableRooms: {},
			chatlog: [],

			createNewMessage: this.createNewMessage,
			createNewRoom: this.createNewRoom,
			emitTyping: this.emitTyping,
			usersTyping: [],

			firstTime: true,
		};

		this.state.socket.on("connection successful", (data) =>
			this.setAvailableRoomsInState(data)
		);
		this.state.socket.on("join successful", (data) =>
			this.setRoomInState(data)
		);
		this.state.socket.on("chatlog", (data) => this.generateChatLog(data));

		this.state.socket.on("user message", (data) =>
			this.generateChatMessage(data)
		);
		this.state.socket.on("notice", (data) => this.generateChatMessage(data));

		this.state.socket.on("created new room", (data) =>
			this.updateAvailableRooms(data)
		);

		this.state.socket.on("room has been created", (data) => this.joinCreatedRoom(data));

		this.state.socket.on("user left room", (data) =>
			this.updateUsersinRoom(data)
		);
		this.state.socket.on("user joined room", (data) =>
			this.updateUsersinRoom(data)
		);
		this.state.socket.on("remove room", (data) => this.removeRoom(data));

		this.state.socket.on("typing", (data) => this.handleTyping(data));
	}

	joinCreatedRoom = (data) => {
		this.joinRoom('server', data)
	}

	removeRoom = (data) => {
		const { clearRoom } = data

		let roomAnchor = "open";
		let findRoom = this.state.availableRooms.open.findIndex(
			(room) => room.id === clearRoom
		);
		if (findRoom === -1) {
			roomAnchor = "locked";
			findRoom = this.state.availableRooms.locked.findIndex(
				(room) => room.id === clearRoom
			);
		}


		if (findRoom !== -1) {
			const copiedRoomsList = [...this.state.availableRooms[roomAnchor]];
			copiedRoomsList.splice(findRoom, 1)
			this.setState({
				availableRooms: {
					...this.state.availableRooms,
					[roomAnchor]: copiedRoomsList,
				}
			})
		}
	}

	setAvailableRoomsInState = (data) => {
		this.setState({
			availableRooms: data,
		});
	};

	setRoomInState = (data) => {
		this.setState({
			connectedRoom: data.roomId,
			connectedRoomColor: data.roomColor,
			usersTyping: [],
		});
	};

	// Kör funktion när knapp trycks ner, ta bort tidigare localstorage uppdaterar name i localstorage som uppdaterar state till det i input
	createName = (inputName) => {
		const newUser = inputName;
		this.setState({
			name: newUser,
		});
	};

	updateUsersinRoom = (user) => {
		let roomAnchor = "open";
		let findRoom = this.state.availableRooms.open.findIndex(
			(room) => room.id === user.room
		);
		if (findRoom === -1) {
			roomAnchor = "locked";
			findRoom = this.state.availableRooms.locked.findIndex(
				(room) => room.id === user.room
			);
		}
		const copiedRoomsList = [...this.state.availableRooms[roomAnchor]];

		if (user.join) {
			this.addUserToRoom(
				{ username: user.username },
				copiedRoomsList,
				findRoom,
				roomAnchor
			);
		} else {
			this.removeUserFromRoom(
				{ username: user.username },
				copiedRoomsList,
				findRoom,
				roomAnchor
			);
		}
	};

	addUserToRoom = (user, roomsList, index, anchor) => {
		roomsList[index].users.push({ name: user.username });
		this.setUpdatedUsersInState(roomsList, anchor);
	};

	removeUserFromRoom = (user, roomsList, index, anchor) => {
		const userIndex = roomsList[index].users.findIndex((userindex) => userindex.name === user.name)
		roomsList[index].users.splice(userIndex, 1)

		this.setUpdatedUsersInState(roomsList, anchor)
	}

	setUpdatedUsersInState = (roomsList, anchor) => {
		const indexEmptyRoom = roomsList.findIndex((r) => r.users === [])

		if (roomsList.users === '') {
			roomsList.splice(indexEmptyRoom, 1)
		}

		this.setState({
			availableRooms: {
				...this.state.availableRooms,
				[anchor]: roomsList
			}
		})
	}

	joinRoom = (event, otherVerification) => {
		let roomId = ''
		const name = this.state.name;

		if (otherVerification) {
			roomId = otherVerification.id
		} else {
			event.preventDefault();
			roomId = event.target.id;
		}

		const prevRoomId = this.state.connectedRoom;

		this.setState({
			firstTime: true,
		});

		// emit
		this.state.socket.emit("join room", {
			name,
			roomId,
			prevRoomId,
			// roomColor,
		});
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
			color: roomValues.roomColor,
		});
	};

	updateAvailableRooms = (room) => {
		let updateArray;
		let anchor;

		if (room.password.length !== 0) {
			updateArray = [...this.state.availableRooms.locked];
			anchor = "locked";
		} else {
			updateArray = [...this.state.availableRooms.open];
			anchor = "open";
		}

		updateArray.push(room);
		this.setState(
			{
				availableRooms: {
					...this.state.availableRooms,
					[anchor]: updateArray,
				},
			}
		);
	};

	emitTyping = (isTyping) => {
		this.state.socket.emit("typing", {
			name: this.state.name,
			isTyping,
			roomId: this.state.connectedRoom,
		});
	};

	handleTyping = (typingUser) => {
		const found = this.state.usersTyping.find(
			(typer) => typer.name === typingUser.name
		);

		if (!found) {
			if (typingUser.isTyping) {
				this.setState({
					usersTyping: [...this.state.usersTyping, typingUser],
				});
			}
		} else {
			if (typingUser.isTyping === false) {
				let typers = [...this.state.usersTyping];
				let index = typers.findIndex((typer) => typer.name === typingUser.name);

				typers.splice(index, 1);
				this.setState({
					usersTyping: typers,
				});
			}
		}
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
