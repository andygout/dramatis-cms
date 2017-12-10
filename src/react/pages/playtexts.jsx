import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../components/page-title';

class Playtexts extends Component {

	render () {

		return (
			<div>

				<PageTitle pageTitle='Playtexts' />

				<pre>{ JSON.stringify(this.props.playtexts, null, 4) }</pre>

			</div>
		);

	};

};

Playtexts.propTypes = { playtexts: PropTypes.array.isRequired };

const mapStateToProps = ({ playtexts }) => ({ playtexts });

export default connect(mapStateToProps)(Playtexts);
