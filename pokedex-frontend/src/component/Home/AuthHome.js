import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
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

	handleOnSubmit = async (event, event2) => {
		// event.preventDefault();

		const {
			firstName,
			lastName,
			friendMobileNumber,
			nickName,
		} = this.state;

		let jwtToken = localStorage.getItem("jwtToken");

		try {
			var d = new Date();
			let payload = await axios.post(
				"http://localhost:4001/friends/create-friend",
				{
					firstName: event,
					lastName: "jj",
					mobileNumber: event2 + 1,
					nickName: `${d.getFullYear()}-${
						d.getMonth() + 1
					}-${d.getDate()}`,
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

			toast.success(
				`${event.charAt(0).toUpperCase() + event.slice(1)} was caught!`,
				{
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
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
							style={{ width: 96, height: 96 }}
						/>
						<p className="text-center text-capitalize fs-4 fw-bold">
							{`#${index + 1} ${item.name}`}
						</p>
						<button
							type="button"
							className="btn btn-primary btn-sm"
							onClick={() =>
								this.handleOnSubmit(item.name, index)
							}
						>
							Catch
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
