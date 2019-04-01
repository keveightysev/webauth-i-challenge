import React from 'react';
import axios from 'axios';

class App extends React.Component {
	state = {
		loggedIn: false,
		username: '',
		password: '',
		errMessage: '',
		users: [],
	};

	handleChanges = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		const credentials = {
			username: this.state.username,
			password: this.state.password,
		};
		try {
			const res = await axios.post(
				'http://localhost:5000/users/login/',
				credentials,
			);
			if (res.status === 200) {
				const users = await axios.get('http://localhost:5000/users/users', {
					headers: {
						username: this.state.username,
						password: this.state.password,
					},
				});
				this.setState({
					loggedIn: true,
					password: '',
					users: users.data,
				});
			} else {
				this.setState({
					errMessage: 'Invalid credentials',
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	handleSignout = e => {
		e.preventDefault();
		this.setState({
			loggedIn: false,
			username: '',
			password: '',
			users: [],
		});
	};

	render() {
		return (
			<div className='App'>
				<header>
					<h1>Users</h1>
					{this.state.loggedIn ? (
						<div>
							<p>Welcome {this.state.username}!</p>
							<button onClick={this.handleSignout}>Sign Out</button>
						</div>
					) : (
						<form onSubmit={this.handleSubmit}>
							<p>Please sign in:</p>
							<input
								type='text'
								name='username'
								placeholder='Username'
								value={this.state.username}
								onChange={this.handleChanges}
							/>
							<input
								type='password'
								name='password'
								placeholder='Password'
								value={this.state.password}
								onChange={this.handleChanges}
							/>
							<button>Submit</button>
						</form>
					)}
				</header>
				<main>
					{this.state.users.length ? (
						<div>
							{this.state.users.map(user => (
								<h2 key={user.id}>{user.username}</h2>
							))}
						</div>
					) : null}
				</main>
			</div>
		);
	}
}

export default App;
