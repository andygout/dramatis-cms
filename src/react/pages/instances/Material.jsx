import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { MaterialForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';

const Material = props => {

	const { material, materialFormData } = props;

	return (
		<InstanceWrapper
			instance={material}
			formAction={materialFormData.action}
		>

			<MaterialForm
				instance={materialFormData.instance || {}}
				action={materialFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Material.propTypes = {
	material: PropTypes.object.isRequired,
	materialFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	material: state.material,
	materialFormData: state.materialFormData
});

export default connect(mapStateToProps)(Material);
