import React, { Component } from 'react';
import { Consumer } from '../../Context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

import uuid from 'uuid';

class AddContacts extends Component {
	state = {
		id: uuid(),
		name: '',
		email: '',
		phone: '',
		errors: {}
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = async (dispatch, e) => {
		e.preventDefault();

		const { name, email, phone } = this.state;

		if (name === '') {
			this.setState({ errors: { name: 'Name is required' } });
			return;
		}

		if (email === '') {
			this.setState({ errors: { email: 'Email is required' } });
			return;
		}

		if (phone === '') {
			this.setState({ errors: { phone: 'Phone is required' } });
			return;
		}

		const newContact = {
			name,
			email,
			phone
		};

		const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);

		dispatch({ type: 'ADD_CONTACT', payload: res.data });

		this.setState({
			name: '',
			email: '',
			phone: '',
			errors: {}
		});

		this.props.history.push('/');
	};

	render() {
		const { name, email, phone, errors } = this.state;

		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;

					return (
						<div className="card mb-3">
							<div className="card-header">Add contact</div>
							<div className="card-body">
								<form onSubmit={this.onSubmit.bind(this, dispatch)}>
									<TextInputGroup
										type="text"
										name="name"
										label="Name"
										placeholder="Name..."
										value={name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<TextInputGroup
										type="text"
										name="email"
										label="Email"
										placeholder="Email"
										value={email}
										onChange={this.onChange}
										error={errors.email}
									/>
									<TextInputGroup
										type="text"
										name="phone"
										label="Phone"
										placeholder="Phone"
										value={phone}
										onChange={this.onChange}
										error={errors.phone}
									/>
									<input type="submit" value="Add contact" className="btn btn-light btn-block" />
								</form>
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default AddContacts;
