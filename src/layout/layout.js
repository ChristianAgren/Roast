// @ts-nocheck
import React from "react";
import { 
	Container 
} from "@material-ui/core";
import Main from "../components/main/main";
import ChatRoom from "../components/chatRoom/chatRoom";
import RoomNavigation from "../components/roomNavigation/roomNavigation";
import { UserContext } from "../contexts/userContext";

function Layout() {
	const [changeView, setChangeView] = React.useState(false);

	const handleChangeView = (roomId) => {
		setChangeView(roomId);
	};

	return (
		<UserContext.Consumer>
			{(user) => (
				<Container
					maxWidth="md"
					style={{
						position: "relative",
						background: "#0001",
						paddingTop: "3rem",

						height:"100vh"
					}}>
					<RoomNavigation changeView={handleChangeView} />

					{changeView ? <ChatRoom /> : <Main />}
				</Container>
			)}
		</UserContext.Consumer>
	);
}

export default Layout;
