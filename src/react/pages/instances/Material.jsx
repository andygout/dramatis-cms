import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { MaterialForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

const Material = props => {

	const { material, materialFormData } = props;

	return (
		<InstanceWrapper
			instance={material}
			formAction={materialFormData.get('action')}
			redirectPath={materialFormData.get('redirectPath')}
		>

			<MaterialForm
				instance={materialFormData.get('instance', new Map())}
				action={materialFormData.get('action', 'Submit')}
			/>

		</InstanceWrapper>
	);

};

Material.propTypes = {
	material: ImmutablePropTypes.map.isRequired,
	materialFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	material: state.get('material'),
	materialFormData: state.get('materialFormData')
});

export default connect(mapStateToProps)(Material);
