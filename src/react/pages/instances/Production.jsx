import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceWrapper } from '../../utils';

class Production extends React.Component {

	render () {

		return (
			<InstanceWrapper
				instance={this.props.production}
			>
			</InstanceWrapper>
		);

	};

};

Production.propTypes = { production: ImmutablePropTypes.map.isRequired };

const mapStateToProps = state => ({ production: state.get('production') });

export default connect(mapStateToProps)(Production);
