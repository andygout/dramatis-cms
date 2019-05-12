import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
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

Playtext.propTypes = { playtext: ImmutablePropTypes.map.isRequired };

const mapStateToProps = state => ({ playtext: state.get('playtext') });

export default connect(mapStateToProps)(Playtext);
