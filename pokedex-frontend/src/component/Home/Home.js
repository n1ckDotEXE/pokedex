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

			const newPokeArray = this.setState({
				pokeArray: pokeData,
			});
		} catch (e) {
			console.log(e);
		}
	}

	showPokeArray = () => {
		let mapper = this.pokeArray.map((item) => {
			return (
				<div className="col-sm-4" key={1}>
					<div className="card">
						<div>ssss</div>
					</div>
				</div>
			);
		});
	};

	render() {
		return (
			<div className="row">
				{this.state.pokeArray.map((pokemon, index) => {
					<p key={index}>{pokemon.name}</p>;
				})}
			</div>
		);
	}
}
export default Home;
