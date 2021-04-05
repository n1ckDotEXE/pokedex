import React, { Component } from "react";
import axios from "axios";

export class Home extends Component {
	state = {
		pokeArray: [],
		caughtArray: [],
	};

	async componentDidMount() {
		try {
			let payload = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/?limit=151`
			);

			// let caughtArrayPayload = await axios.get(
			// 	"http://localhost:4001/friends/get-all-friends"
			// );

			this.setState({
				pokeArray: payload.data.results,
			});

			console.log(this.state.pokeArray);
		} catch (e) {
			console.log(e);
		}
	}

	handleCaughtPoke = () => {
		axios
			.post("/caught", {
				firstName: "Fred",
				lastName: "Flintstone",
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

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
							style={{ width: 200, height: 200 }}
						/>
						<p className="text-center text-capitalize fs-4 fw-bold">
							{`#${index + 1} ${item.name}`}
						</p>
						<button
							type="button"
							className="btn btn-primary btn-sm"
							onClick={this.handleCaughtPoke}
						>
							Caught
						</button>
						<br />
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
