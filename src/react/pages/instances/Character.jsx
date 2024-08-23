import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { CharacterForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';

const Character = props => {

	const { character, characterFormData } = props;

	return (
		<InstanceWrapper
			instance={character}
			formAction={characterFormData.action}
		>

			<CharacterForm
				instance={characterFormData.instance || {}}
				action={characterFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Character.propTypes = {
	character: PropTypes.object.isRequired,
	characterFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	character: state.character,
	characterFormData: state.characterFormData
});

export default connect(mapStateToProps)(Character);
