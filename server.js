const express = require("express");
const path = require("path");
const app = express();
const socket = require("socket.io");
let chatHistory = [
	{
		id: "1",
		history: [
			{
				name: 'Blob',
				message: 'Hej hej hej hej hje'
			},
		]
	},
	{
		id: "2",
		history: [
			{
				name: 'Alvin',
				message: 'it do b like that'
			},
		]
	},
]

app.use(express.static(path.join(__dirname, "build")));
const port = process.env.PORT || 8080;

const routesWithChildren = ["/"];

routesWithChildren.forEach(function (rootPath) {
	app.get(rootPath + "*", function (req, res) {
		// Send or render whatever is appropriate here
		// You can use req.path to get the path that was requested
		// Eg: /dashboard/profile/user5
		res.sendFile(path.join(__dirname, "build", "index.html"));
	});
});

// THIS IS LISTEN DON'T GO IN FFS
const server = app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});

// Socket setup
const io = socket(server);

// Connection, servern måste vara igång för att front-end ska fungera, front end görs på 3000
io.on("connection", function (socket) {
	console.log("made socket connection", socket.id);

	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnected`);
	});

	socket.on("test", (data) => {
		console.log(data);
	});

	socket.on("join room", (data) => {
		if (data.roomId != data.prevRoomId) {
			socket.leave(data.prevRoomId, () => {
				console.log(`${socket.id} left room: ${data.roomId}`);
				io.to(data.prevRoomId).emit("server message", { server_message: `user left: ${data.roomId}` })
			})
			socket.join(data.roomId, () => {
				console.log(`${socket.id} joined room: ${data.roomId}`);
				socket.emit("join successful", data)

				const { history } = chatHistory.find(h => h.id === data.roomId)

				io.to(data.roomId).emit("chatlog", { server_chatlog: history })
				io.to(data.roomId).emit("server message", { server_message: `user connected to: ${data.roomId}` })
			});
		}

		socket.on("message", (newMessage) => {
			const { history } = chatHistory.find(h => h.id === data.roomId)
			history.push({
				name: 'new',
				message: newMessage.message
			})
			io.to(data.roomId).emit("user message", { server_chatlog: history })
		})
	});

});
