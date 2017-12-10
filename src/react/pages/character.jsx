import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SharedInstancePageComponents from '../components/shared-instance-page-components';

class Character extends Component {

	render () {

		const { character } = this.props;

		return (
			<div>

				<SharedInstancePageComponents instance={character} />

				<pre>{ JSON.stringify(character, null, 4) }</pre>

			</div>
		);

	};

};

Character.propTypes = { character: PropTypes.object.isRequired };

const mapStateToProps = ({ character }) => ({ character });

export default connect(mapStateToProps)(Character);
