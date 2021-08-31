import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
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
					instance={materialFormData.get('instance', Map())}
					action={materialFormData.get('action', 'Submit')}
					redirectPath={materialFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

Material.propTypes = {
	material: PropTypes.instanceOf(Map).isRequired,
	materialFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	material: state.get('material'),
	materialFormData: state.get('materialFormData')
});

export default connect(mapStateToProps)(Material);
