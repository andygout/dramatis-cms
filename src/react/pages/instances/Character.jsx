import { Map } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { CharacterForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class Character extends React.Component {

	render () {

		const { character, characterFormData } = this.props;

		return (
			<InstanceWrapper
				instance={character}
				formAction={characterFormData.get('action')}
			>

				<CharacterForm
					instance={characterFormData.get('instance', Map())}
					action={characterFormData.get('action', 'Submit')}
					redirectPath={characterFormData.get('redirectPath')}
				/>

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
