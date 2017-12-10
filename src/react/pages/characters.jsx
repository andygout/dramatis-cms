import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../components/page-title';

class Characters extends Component {

	render () {

		return (
			<div>

				<PageTitle pageTitle='Characters' />

				<pre>{ JSON.stringify(this.props.characters, null, 4) }</pre>

			</div>
		);

	};

};

Characters.propTypes = { characters: PropTypes.array.isRequired };

const mapStateToProps = ({ characters }) => ({ characters });

export default connect(mapStateToProps)(Characters);
