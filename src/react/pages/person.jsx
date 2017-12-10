import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SharedInstancePageComponents from '../components/shared-instance-page-components';

class Person extends Component {

	render () {

		const { person } = this.props;

		return (
			<div>

				<SharedInstancePageComponents instance={person} />

				<pre>{ JSON.stringify(person, null, 4) }</pre>

			</div>
		);

	};

};

Person.propTypes = { person: PropTypes.object.isRequired };

const mapStateToProps = ({ person }) => ({ person });

export default connect(mapStateToProps)(Person);
