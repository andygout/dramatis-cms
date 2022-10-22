import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { CompanyForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../wrappers';

const Company = props => {

	const { company, companyFormData } = props;

	return (
		<InstanceWrapper
			instance={company}
			formAction={companyFormData.action}
		>

			<CompanyForm
				instance={companyFormData.instance || {}}
				action={companyFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Company.propTypes = {
	company: PropTypes.object.isRequired,
	companyFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	company: state.company,
	companyFormData: state.companyFormData
});

export default connect(mapStateToProps)(Company);
