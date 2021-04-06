import React, { Component } from "react";
import axios from "axios";

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pokeArray: [],
			caughtArray: [],
			isLoading: false,
			isError: false,
			errorMessage: "",
			pokeName: "",
			pokeNum: "",
			firstName: "",
			lastName: "",
			friendMobileNumber: "",
			nickName: "",
			errorObj: {},
			friendsArray: [],
		};
	}

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
	handleCreateFriend = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	handleCaughtPoke = async (event) => {
		const { pokeName, pokeNum } = this.state;
		let jwtToken = localStorage.getItem("jwtToken");
		try {
			let payload = await axios.post(
				"http://localhost:4001/friends/create-friend",
				{
					pokeName,
					pokeNum,
				},
				{
					headers: {
						authorization: `Bearer ${jwtToken}`,
					},
				}
			);
			let newFriendsArray = [...this.state.friendsArray, payload.data];
			this.setState({
				firstName: "",
				lastName: "",
				friendpokeNum: "",
				nickName: "",
				friendsArray: newFriendsArray,
			});
		} catch (e) {
			console.log(e.response);
		}
	};
	handleOnSubmit = async (event) => {
		event.preventDefault();

		const {
			firstName,
			lastName,
			friendMobileNumber,
			nickName,
		} = this.state;

		let jwtToken = localStorage.getItem("jwtToken");

		try {
			let payload = await axios.post(
				"http://localhost:4001/friends/create-friend",
				{
					firstName,
					lastName,
					mobileNumber: friendMobileNumber,
					nickName,
				},
				{
					headers: {
						authorization: `Bearer ${jwtToken}`,
					},
				}
			);

			let newFriendsArray = [...this.state.friendsArray, payload.data];

			this.setState({
				firstName: "qq",
				lastName: "qqq",
				friendMobileNumber: "2",
				nickName: "qqqq",
				friendsArray: newFriendsArray,
			});
		} catch (e) {
			console.log(e.response);
		}
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
							onClick={this.handleOnSubmit}
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
