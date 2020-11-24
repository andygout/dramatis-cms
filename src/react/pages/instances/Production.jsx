import { Map } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ProductionForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class Production extends React.Component {

	render () {

		const { production, productionFormData } = this.props;

		return (
			<InstanceWrapper
				instance={production}
				formAction={productionFormData.get('action')}
			>

				<ProductionForm
					instance={productionFormData.get('instance', Map())}
					action={productionFormData.get('action', 'Submit')}
					redirectPath={productionFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

Production.propTypes = {
	production: ImmutablePropTypes.map.isRequired,
	productionFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	production: state.get('production'),
	productionFormData: state.get('productionFormData')
});

export default connect(mapStateToProps)(Production);
