import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ProductionForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

const Production = props => {

	const { production, productionFormData } = props;

	return (
		<InstanceWrapper
			instance={production}
			formAction={productionFormData.get('action')}
			redirectPath={productionFormData.get('redirectPath')}
		>

			<ProductionForm
				instance={productionFormData.get('instance', new Map())}
				action={productionFormData.get('action', 'Submit')}
			/>

		</InstanceWrapper>
	);

};

Production.propTypes = {
	production: ImmutablePropTypes.map.isRequired,
	productionFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	production: state.get('production'),
	productionFormData: state.get('productionFormData')
});

export default connect(mapStateToProps)(Production);
