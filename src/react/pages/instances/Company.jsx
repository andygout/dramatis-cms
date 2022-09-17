import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { CompanyForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

const Company = props => {

	const { company, companyFormData } = props;

	return (
		<InstanceWrapper
			instance={company}
			formAction={companyFormData.get('action')}
		>

			<CompanyForm
				instance={companyFormData.get('instance', new Map())}
				action={companyFormData.get('action', 'Submit')}
			/>

		</InstanceWrapper>
	);

};

Company.propTypes = {
	company: ImmutablePropTypes.map.isRequired,
	companyFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	company: state.get('company'),
	companyFormData: state.get('companyFormData')
});

export default connect(mapStateToProps)(Company);
