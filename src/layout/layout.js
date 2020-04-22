// @ts-nocheck
import React from "react";
import Main from "../components/main/main";
import ChatRoom from "../components/chatRoom/chatRoom";
import RoomNavigation from "../components/roomNavigation/roomNavigation";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Layout() {
	const [inRoom, setInRoom] = React.useState(false);

	const handleSwitchRoom = (roomId) => {
		console.log("roomId:", roomId);
		setInRoom(roomId);
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<>
					<RoomNavigation switchRoom={handleSwitchRoom} />

					<div style={{ marginTop: "4rem" }}>
						{inRoom ? <ChatRoom /> : <Main />}
					</div>

					<input
						placeholder="name"
						onChange={(e) => user.setUserName(e.target.value)}
					/>
					<h2>{user.name}</h2>
					{console.log(user)}
				</>
			)}
		</UserContext.Consumer>
	);
}

export default Layout;
