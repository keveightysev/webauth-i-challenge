import React from 'react';

class App extends React.Component {
	state = {
		loggedIn: false,
		username: '',
		password: '',
	};

	handleChanges = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	render() {
		return (
			<div className='App'>
				<header>
					<h1>Users</h1>
					{this.state.loggedIn ? (
						<p>Welcome {this.state.username}!</p>
					) : (
						<form>
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
			</div>
		);
	}
}

export default App;
