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

	isDesktop: true,
});

export default class UserProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.setUserName(),
			socket: user.socket,
			isDesktop: true,

			setUserName: this.setUserName,
			joinRoom: this.joinRoom,
		};
	}
	componentDidMount = () => {
		if (window.innerWidth < 680) {
			this.setState({
				isDesktop: false,
			});
		}
		window.addEventListener("resize", () => {
			if (window.innerWidth < 680) {
				this.setState({
					isDesktop: false,
				});
			} else {
				this.setState({
					isDesktop: true,
				});
			}
		});
	};

	setUserName = (name) => {
		this.setState({
			name: name,
		});
	};

	joinRoom = (event, props) => {
		const name = "bob";
		const roomId = event.target.id;

		console.log("name: ", name, "\nid: ", roomId);

		// emit
		this.state.socket.emit("join room", { name, roomId });

		// hey listen

		this.state.socket.on("join successful", (data) => {
			console.log(data);
			props.switchRoom(data.roomId);
			props.toggleDrawer();
		});
	};

	render() {
		return (
			<UserContext.Provider value={this.state}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}
