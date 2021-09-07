import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { PersonForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class Person extends React.Component {

	render () {

		const { person, personFormData } = this.props;

		return (
			<InstanceWrapper
				instance={person}
				formAction={personFormData.get('action')}
			>

				<PersonForm
					instance={personFormData.get('instance', Map())}
					action={personFormData.get('action', 'Submit')}
					redirectPath={personFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

Person.propTypes = {
	person: PropTypes.instanceOf(Map).isRequired,
	personFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	person: state.get('person'),
	personFormData: state.get('personFormData')
});

export default connect(mapStateToProps)(Person);
