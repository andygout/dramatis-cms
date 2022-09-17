import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { PersonForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

const Person = props => {

	const { person, personFormData } = props;

	return (
		<InstanceWrapper
			instance={person}
			formAction={personFormData.get('action')}
			redirectPath={personFormData.get('redirectPath')}
		>

			<PersonForm
				instance={personFormData.get('instance', new Map())}
				action={personFormData.get('action', 'Submit')}
			/>

		</InstanceWrapper>
	);

};

Person.propTypes = {
	person: ImmutablePropTypes.map.isRequired,
	personFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	person: state.get('person'),
	personFormData: state.get('personFormData')
});

export default connect(mapStateToProps)(Person);
