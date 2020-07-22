import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceWrapper } from '../../utils';

class Production extends React.Component {

	render () {

		const { production, productionFormData } = this.props;

		return (
			<InstanceWrapper
				instance={production}
				formData={productionFormData}
			>
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
