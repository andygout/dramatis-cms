import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceWrapper } from '../../utils';

class Person extends React.Component {

	render () {

		const { person, personFormData } = this.props;

		return (
			<InstanceWrapper
				instance={person}
				formData={personFormData}
			>
			</InstanceWrapper>
		);

	}

}

Person.propTypes = {
	person: ImmutablePropTypes.map.isRequired,
	personFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	person: state.get('person'),
	personFormData: state.get('personFormData')
});

export default connect(mapStateToProps)(Person);
