import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceWrapper } from '../../utils';

class Playtext extends React.Component {

	render () {

		const { playtext, playtextFormData } = this.props;

		return (
			<InstanceWrapper
				instance={playtext}
				formData={playtextFormData}
			>
			</InstanceWrapper>
		);

	}

}

Playtext.propTypes = {
	playtext: ImmutablePropTypes.map.isRequired,
	playtextFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	playtext: state.get('playtext'),
	playtextFormData: state.get('playtextFormData')
});

export default connect(mapStateToProps)(Playtext);
