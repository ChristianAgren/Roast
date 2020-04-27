// @ts-nocheck
const express = require("express");
const path = require("path");
const app = express();
const socket = require("socket.io");
const server = require('http').createServer(app)
const io = socket(server);
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "build")));

// THIS IS LISTEN DON'T GO IN FFS
server.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});

let roomInformation = [
	{
		id: "1",
		users: [],
		password: '',
		color: '',
		history: [
			{
				name: "Blob",
				message: "Hej hej hej hej hje",
				client: true,
			},
		],
	},
	{
		id: "2",
		users: [],
		password: '',
		color: '',
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
		// Send or render whatever is appropriate here
		// You can use req.path to get the path that was requested
		// Eg: /dashboard/profile/user5
		res.sendFile(path.join(__dirname, "build", "index.html"));
	});
});



// Connection, servern måste vara igång för att front-end ska fungera, front end görs på 3000
io.on("connection", function (socket) {
	console.log("made socket connection", socket.id);
	let lockedRooms = [],
		openRooms = []

	roomInformation.forEach((room) => {
		const availableRoom = {
			id: room.id,
			users: room.users,
			password: room.password,
			color: room.color
		}
		if (room.password.length != 0) {
			lockedRooms.push(availableRoom)
		} else {
			openRooms.push(availableRoom)
		}
	})

	const allRooms = {
		open: openRooms,
		locked: lockedRooms
	}

	io.to(socket.id).emit("connection successful", allRooms)

	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnected`);
	});

	socket.on("join room", (data) => {
		const user = {
			name: data.name,
			// isTyping: false,
		};

		if (data.roomId != data.prevRoomId) {
			if (data.prevRoomId) {
				socket.leave(data.prevRoomId, () => {

					console.log("in leave room");
					const { users } = roomInformation.find(
						(r) => r.id === data.prevRoomId
					);
					const leaver = users.findIndex((u) => u.name === data.name);

					if (leaver != -1) {
						users.splice(leaver, 1);
						console.log(users);
					}

					io.emit("user left room", { username: user.name, room: data.prevRoomId, join: false });

					io.to(data.prevRoomId).emit("notice", {
						name: "",
						message: user.name + " has left the room",
					});
				});
			}
			socket.join(data.roomId, () => {
				console.log("in join room");

				const { users } = roomInformation.find((r) => r.id === data.roomId);
				users.push(user);
				console.log(user);
				
				console.log(`${socket.id} joined room: ${data.roomId}`);

				io.emit("user joined room", {username: user.name, room: data.roomId, join: true})
				socket.emit("join successful", data);

				const { history } = roomInformation.find((h) => h.id === data.roomId);

				io.to(socket.id).emit("chatlog", { server_chatlog: history });

				io.to(data.roomId).emit("server message", {
					server_message: `user connected to: ${data.roomId}`,
				});

				io.to(data.roomId).emit("notice", {
					name: "",
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

		const message = {
			name: newMessage.name,
			message: newMessage.message,
			client: true,
		};

		history.push(message);

		io.to(newMessage.roomId).emit("user message", message);
	});

	socket.on("create room", (roomValues) => {
		const response = {
			id: `${roomValues.id}-#${[...Array(5)].map(i => (~~(Math.random() * 36)).toString(36)).join('')}`,
			password: roomValues.password,
			color: roomValues.color,
			users: [],
		}
		const newRoom = {
			...response,
			history: []
		}

		roomInformation.push(newRoom)

		io.emit("created new room", response)
	})

});
