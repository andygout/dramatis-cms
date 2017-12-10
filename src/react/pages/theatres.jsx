import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../components/page-title';

class Theatres extends Component {

	render () {

		return (
			<div>

				<PageTitle pageTitle='Theatres' />

				<pre>{ JSON.stringify(this.props.theatres, null, 4) }</pre>

			</div>
		);

	};

};

Theatres.propTypes = { theatres: PropTypes.array.isRequired };

const mapStateToProps = ({ theatres }) => ({ theatres });

export default connect(mapStateToProps)(Theatres);
