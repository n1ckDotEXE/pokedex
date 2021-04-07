import React, { Component } from "react";
import axios from "axios";

export class Home extends Component {
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
		} catch (e) {
			console.log(e);
		}
	}

	showPokeArray = () => {
		return this.state.pokeArray.map((item, index) => {
			return (
				<div className="col-sm-4" key={index}>
					<div className="card">
						<img
							className="rounded mx-auto d-block"
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
								index + 1
							}.png`}
							alt={item.name}
							style={{ width: 96, height: 96 }}
						/>
						<p className="text-center text-capitalize fs-4 fw-bold">
							{`#${index + 1} ${item.name}`}
						</p>
					</div>
				</div>
			);
		});
	};

	render() {
		return <div className="row">{this.showPokeArray()}</div>;
	}
}
export default Home;
