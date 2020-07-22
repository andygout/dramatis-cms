import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceWrapper } from '../../utils';

class Character extends React.Component {

	render () {

		const { character, characterFormData } = this.props;

		return (
			<InstanceWrapper
				instance={character}
				formData={characterFormData}
			>
			</InstanceWrapper>
		);

	}

}

Character.propTypes = {
	character: ImmutablePropTypes.map.isRequired,
	characterFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	character: state.get('character'),
	characterFormData: state.get('characterFormData')
});

export default connect(mapStateToProps)(Character);
