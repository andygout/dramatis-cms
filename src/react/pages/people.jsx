import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../components/page-title';

class People extends Component {

	render () {

		return (
			<div>

				<PageTitle pageTitle='People' />

				<pre>{ JSON.stringify(this.props.people, null, 4) }</pre>

			</div>
		);

	};

};

People.propTypes = { people: PropTypes.array.isRequired };

const mapStateToProps = ({ people }) => ({ people });

export default connect(mapStateToProps)(People);
