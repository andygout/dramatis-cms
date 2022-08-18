import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { MaterialForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class Material extends React.Component {

	render () {

		const { material, materialFormData } = this.props;

		return (
			<InstanceWrapper
				instance={material}
				formAction={materialFormData.get('action')}
			>

				<MaterialForm
					instance={materialFormData.get('instance', new Map())}
					action={materialFormData.get('action', 'Submit')}
					redirectPath={materialFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

Material.propTypes = {
	material: ImmutablePropTypes.map.isRequired,
	materialFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	material: state.get('material'),
	materialFormData: state.get('materialFormData')
});

export default connect(mapStateToProps)(Material);
