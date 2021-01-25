import { Map } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { CompanyForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class Company extends React.Component {

	render () {

		const { company, companyFormData } = this.props;

		return (
			<InstanceWrapper
				instance={company}
				formAction={companyFormData.get('action')}
			>

				<CompanyForm
					instance={companyFormData.get('instance', Map())}
					action={companyFormData.get('action', 'Submit')}
					redirectPath={companyFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

Company.propTypes = {
	company: ImmutablePropTypes.map.isRequired,
	companyFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	company: state.get('company'),
	companyFormData: state.get('companyFormData')
});

export default connect(mapStateToProps)(Company);
