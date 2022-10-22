import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ProductionForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../wrappers';

const Production = props => {

	const { production, productionFormData } = props;

	return (
		<InstanceWrapper
			instance={production}
			formAction={productionFormData.action}
		>

			<ProductionForm
				instance={productionFormData.instance || {}}
				action={productionFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Production.propTypes = {
	production: PropTypes.object.isRequired,
	productionFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	production: state.production,
	productionFormData: state.productionFormData
});

export default connect(mapStateToProps)(Production);
