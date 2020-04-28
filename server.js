// @ts-nocheck
const express = require("express");
const path = require("path");
const app = express();
const socket = require("socket.io");
const server = require("http").createServer(app);
const io = socket(server);
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "build")));

server.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});

let roomInformation = [
	{
		id: "1",
		name: "room",
		users: [],
		password: '',
		color: '#ff69b4',
		history: [
			{
				name: "Blob",
				message: "Hej hej hej hej hje",
				client: true,
			},
		],
	},
	{
		id: "3",
		name: "room",
		users: [],
		password: '',
		color: '#ff69b4',
		history: [
			{
				name: "Blob",
				message: "Hej hej hej hej hje",
				client: true,
			},
		],
	},
	{
		id: "asdf",
		name: "room",
		users: [],
		password: 'lock',
		color: '#123388',
		history: [
			{
				name: "Alvin",
				message: "it do b like that",
				client: true,
			},
		],
	},
];

const routesWithChildren = ["/"];

routesWithChildren.forEach(function (rootPath) {
	app.get(rootPath + "*", function (req, res) {
		res.sendFile(path.join(__dirname, "build", "index.html"));
	});
});

// Connection, servern måste vara igång för att front-end ska fungera, front end görs på 3000
io.on("connection", function (socket) {

	console.log("made socket connection", socket.id);

	let lockedRooms = [],
		openRooms = [];

	roomInformation.forEach((room) => {
		const availableRoom = {
			name: room.name,
			id: room.id,
			users: room.users,
			password: room.password,
			color: room.color,
		};
		if (room.password.length != 0) {
			lockedRooms.push(availableRoom);
		} else {
			openRooms.push(availableRoom);
		}
	});

	const allRooms = {
		open: openRooms,
		locked: lockedRooms,
	};

	io.to(socket.id).emit("connection successful", allRooms);

	socket.on("disconnecting", () => {
		// Manipulate local data
		const rooms = Object.keys(socket.rooms)
		console.log("rooms",rooms)
		let clearRoom 
		rooms.forEach((room) => {
			if (room != socket.id) {
				clearRoom = room
			}
		})
		console.log("rad 108 clearroom",clearRoom);
		
		if (clearRoom) {
			const { users } = roomInformation.find((room) => room.id === clearRoom)
			const leaverInfo = users.find((user) => user.id === socket.id)
			const leaverIndex = users.findIndex((user) => user.id === socket.id)
			users.splice(leaverIndex, 1)

			//Emit to sockets
			io.emit("user left room", { username: leaverInfo.name, room: clearRoom, join: false });
		}
		console.log(`${socket.id} disconnected`);
	});

	socket.on("join room", (data) => {

		const user = {
			name: data.name,
			id: socket.id
		};

		if (data.roomId != data.prevRoomId) {
			if (data.prevRoomId) {
				socket.leave(data.prevRoomId, () => {
					// Manipulate local data
					const { users } = roomInformation.find(
						(r) => r.id === data.prevRoomId
					);
					const leaver = users.findIndex((u) => u.id === user.id);	

					// rooms måste skicka users så vi kan ta bort rummet om det är tomt
					// Här kallar vi på removeRoom i userContext som uppdaterar rooms listan som ska mappas ut
					// Om rooms.users är tom sätt splice:a ut rummet ur roomslistan.
					// Om users är en tom lista, ta bort rummet

					// Om users === []
					

					
					// const roomToRemove = rooms.findIndex((r) => r.roomId === data.prevRoomId)

					// if (users === []) {
					// 	removeRoom(roomToRemove)
					// }
					

					if (leaver != -1) {
						users.splice(leaver, 1);
					}

					// console.log(allRooms)
					
					// // Hitta index i öppna rum där id stämmer med prev rum
					// const openRoomIndex = allRooms.open.findIndex((r)=> r.id === data.prevRoomId)

					// // Ta bort det rummet från det indexet
					// allRooms.open.splice(openRoomIndex, 1)

					// console.log(allRooms)
					
					// // // Hitta vilket rum som ska tas bort
					// // roomToRemove = allRooms.open.find((p) => p.id === data.prevRoomId)
					

					// // Skicka nya allRooms till userContext
					// io.emit("remove room", {allRooms})
					// // console.log(roomInformation);
					

					// Update sockets and rooms
					io.emit("user left room", { username: user.name, room: data.prevRoomId, join: false });
					io.to(data.prevRoomId).emit("notice", {
						message: user.name + " has left the room",
					});
				});
			}
			socket.join(data.roomId, () => {
				// Manipulate local data
				const { users } = roomInformation.find((r) => r.id === data.roomId);
				users.push(user);
				io.to(socket.id).emit("join successful", data);

				//Update all socket's room information
				io.emit("user joined room", {username: user.name, room: data.roomId, join: true})

				//Send history to socket
				const { history } = roomInformation.find((h) => h.id === data.roomId);
				io.to(socket.id).emit("chatlog", { server_chatlog: history });

				//Send message to chatroom
				io.to(data.roomId).emit("notice", {
					message: user.name + " has joined the room",
					client: false,
				});
			});
		}
	});
	// socket.on("typing", (typingUser) => {
	// 	socket.broadcast.to(data.roomId).emit("typing", typingUser);
	// });

	socket.on("message", (newMessage) => {
		const { history } = roomInformation.find((h) => h.id === newMessage.roomId);
		const { color } = roomInformation.find((h) => h.id === newMessage.roomId);
		
		const message = {
			name: newMessage.name,
			message: newMessage.message,
			color: color,
			client: true,
		};

		history.push(message);

		io.to(newMessage.roomId).emit("user message", message);
	});

	socket.on("create room", (roomValues) => {
		const response = {
			name: roomValues.id,
			id: `#${[...Array(3)]
				.map((i) => (~~(Math.random() * 36)).toString(36))
				.join("")}`,
			password: roomValues.password,
			color: roomValues.color,
			users: [],
		};
		const newRoom = {
			...response,
			history: [],
		};

		roomInformation.push(newRoom);

		io.emit("created new room", response);
	});
});
