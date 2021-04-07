import React, { Component } from "react";
import axios from "axios";

export class CreateFriend extends Component {
	state = {
		firstName: "",
		lastName: "",
		friendMobileNumber: "",
		nickName: "",
		isError: false,
		errorObj: {},
		isLoading: false,
		friendsArray: [],
	};

	componentDidMount = async () => {
		this.setState({
			isLoading: true,
		});

		try {
			let jwtToken = localStorage.getItem("jwtToken");
			let payload = await axios.get(
				"http://localhost:4001/friends/get-all-friends",
				{
					headers: {
						authorization: `Bearer ${jwtToken}`,
					},
				}
			);

			this.setState({
				isLoading: false,
				friendsArray: payload.data.friends,
			});
		} catch (e) {
			console.log(e);
		}
	};

	handleCreateFriend = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleOnSubmit = async (event) => {
		// event.preventDefault();

		const {
			firstName,
			lastName,
			friendMobileNumber,
			nickName,
		} = this.state;
		let jwtToken = localStorage.getItem("jwtToken");
		try {
			let payload = await axios.delete(
				"http://localhost:4001/friends/delete-friend",
				{
					event,
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
				friendMobileNumber: "",
				nickName: "",
				friendsArray: newFriendsArray,
			});
		} catch (e) {
			console.log(e.response);
		}
	};

	showErrorMessageObj = () => {
		let errorMessageArray = Object.values(this.state.errorObj);

		return errorMessageArray.map((errorMessage, index) => {
			return (
				<div key={index} className="alert alert-danger">
					{errorMessage}
				</div>
			);
		});
	};

	// showFriendsArray = () => {
	// 	return this.state.friendsArray.map((item) => {
	// 		return (
	// 			<tr key={item._id}>
	// 				<td className="text-center text-capitalize">
	// 					{item.firstName}
	// 				</td>
	// 				<td>{item.mobileNumber}</td>

	// 				<td>{item.nickName}</td>
	// 			</tr>
	// 		);
	// 	});
	// };

	showFriendsArray = () => {
		return this.state.friendsArray.map((item, index) => {
			return (
				<div className="col-sm-4" key={index}>
					<div className="card">
						<img
							className="rounded mx-auto d-block"
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.mobileNumber}.png`}
							alt={item.firstName}
							style={{ width: 96, height: 96 }}
						/>
						<p className="text-center text-capitalize fs-4 fw-bold">
							{`${item.firstName}`}
						</p>
						<p className="text-center fs-8">{`${item.nickName}`}</p>
						<button
							type="button"
							className="btn btn-warning btn-sm"
							onClick={() =>
								this.handleOnSubmit(item.name, index)
							}
						>
							Release
						</button>
						<br />
					</div>
				</div>
			);
		});
	};

	render() {
		return (
			<>
				<div>
					{this.state.isLoading ? (
						<span>...loading</span>
					) : (
						<div>{this.showFriendsArray()}</div>
					)}
				</div>
			</>
		);
	}
}

export default CreateFriend;
