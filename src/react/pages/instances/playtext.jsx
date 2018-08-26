import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import InstanceWrapper from '../../utils/instance-wrapper';

class Playtext extends React.Component {

	render () {

		return (
			<InstanceWrapper
				instance={this.props.playtext}
			>
			</InstanceWrapper>
		);

	};

};

Playtext.propTypes = { playtext: PropTypes.object.isRequired };

const mapStateToProps = ({ playtext }) => ({ playtext });

export default connect(mapStateToProps)(Playtext);
