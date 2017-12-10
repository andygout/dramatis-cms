import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SharedInstancePageComponents from '../components/shared-instance-page-components';

class Playtext extends Component {

	render () {

		const { playtext } = this.props;

		return (
			<div>

				<SharedInstancePageComponents instance={playtext} />

				<pre>{ JSON.stringify(playtext, null, 4) }</pre>

			</div>
		);

	};

};

Playtext.propTypes = { playtext: PropTypes.object.isRequired };

const mapStateToProps = ({ playtext }) => ({ playtext });

export default connect(mapStateToProps)(Playtext);
