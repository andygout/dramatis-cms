import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { CharacterForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

const Character = props => {

	const { character, characterFormData } = props;

	return (
		<InstanceWrapper
			instance={character}
			formAction={characterFormData.get('action')}
		>

			<CharacterForm
				instance={characterFormData.get('instance', new Map())}
				action={characterFormData.get('action', 'Submit')}
			/>

		</InstanceWrapper>
	);

};

Character.propTypes = {
	character: ImmutablePropTypes.map.isRequired,
	characterFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	character: state.get('character'),
	characterFormData: state.get('characterFormData')
});

export default connect(mapStateToProps)(Character);
