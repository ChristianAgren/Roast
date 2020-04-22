import React from "react";
import Layout from "./layout/layout";
import UserProvider from "./contexts/userContext";

function App() {
	return (
		<UserProvider>
			<Layout />
		</UserProvider>
	);
}

export default App;
