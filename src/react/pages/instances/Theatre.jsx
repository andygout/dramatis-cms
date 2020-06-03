import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceWrapper } from '../../utils';

class Theatre extends React.Component {

	render () {

		const { theatre, theatreFormData } = this.props;

		return (
			<InstanceWrapper
				instance={theatre}
				formData={theatreFormData}
			>
			</InstanceWrapper>
		);

	};

};

Theatre.propTypes = {
	theatre: ImmutablePropTypes.map.isRequired,
	theatreFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	theatre: state.get('theatre'),
	theatreFormData: state.get('theatreFormData')
});

export default connect(mapStateToProps)(Theatre);
