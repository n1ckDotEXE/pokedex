import React, { Component } from "react";
import axios from "axios";

export class Home extends Component {
	state = {
		pokeArray: [],
	};
	async componentDidMount() {
		try {
			let pokeData = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000`
			);
			this.setState({
				pokeArray: pokeData,
			});
		} catch (e) {
			console.log(e);
		}
		console.log(this.state.pokeArray);
	}

	render() {
		return <div>Home</div>;
	}
}
export default Home;
