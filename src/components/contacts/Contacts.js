import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../Context';

class Contacts extends Component {
	render() {
		return (
			<Consumer>
				{(value) => {
					const { contacts } = value;

					return (
						<React.Fragment>
							<h1 className="display-4 mb-4">Contact List</h1>
							{contacts.map((contact) => (
								<Contact
									key={contact.id}
									id={contact.id}
									name={contact.name}
									email={contact.email}
									phone={contact.phone}
								/>
							))}
						</React.Fragment>
					);
				}}
			</Consumer>
		);
	}
}

export default Contacts;
