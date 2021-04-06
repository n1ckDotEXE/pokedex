import React, { Component } from "react";
import axios from "axios";

export class MyPokemon extends Component {
	state = {
		pokeArray: [],
	};

	async componentDidMount() {
		try {
			let payload = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/?limit=151`
			);

			this.setState({
				pokeArray: payload.data.results,
			});

			console.log(this.state.pokeArray);
		} catch (e) {
			console.log(e);
		}
	}
	render() {
		return <div></div>;
	}
}

export default MyPokemon;
