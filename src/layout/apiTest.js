// @ts-nocheck

import React from "react";
function ApiTest() {
	const search = "cat";

	// const getGiphyAsync = async () => {
	const key = "017OsVu1S3JfdgoAgGOSlyvqt0f1iDsT";

	const [searchWord, setSearchWord] = React.useState();

	const handleOnChange = (event) => {
		console.log(event.target.value);
		setSearchWord(event.target.value);
	};
	const handleOnClick = () => {
		console.log(searchWord);

		fetch(
			`http://api.giphy.com/v1/gifs/search?q=${searchWord}&api_key=${key}&limit=1`
			// `http://api.giphy.com/v1/gifs/random?&api_key=${key}&limit=1`
		)
			.then((response) => response.json())
			.then((content) => {
				// data, pagination, meta
				console.log(content.data);
				console.log("META : ", content.meta);

				let fig = document.createElement("figure");
				let img = document.createElement("img");

				img.src = content.data[0].images.downsized.url;
				img.alt = content.data[0].title;

				fig.appendChild(img);
				
				let out = document.querySelector(".output");
				out.insertAdjacentElement("afterbegin", fig);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<div>
				<input type="text" class="input" onChange={(e) => handleOnChange(e)} />
				<button onClick={() => handleOnClick()}> click </button>
			</div>
			<div class="output"></div>
		</div>
	);
}

export default ApiTest;
