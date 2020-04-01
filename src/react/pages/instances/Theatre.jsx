import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceWrapper } from '../../utils';

class Theatre extends React.Component {

	render () {

		return (
			<InstanceWrapper
				instance={this.props.theatre}
			>
			</InstanceWrapper>
		);

	};

};

Theatre.propTypes = { theatre: ImmutablePropTypes.map.isRequired };

const mapStateToProps = state => ({ theatre: state.get('theatre') });

export default connect(mapStateToProps)(Theatre);
