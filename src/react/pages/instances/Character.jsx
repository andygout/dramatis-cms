import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceWrapper } from '../../utils';

class Character extends React.Component {

	render () {

		return (
			<InstanceWrapper
				instance={this.props.character}
			>
			</InstanceWrapper>
		);

	};

};

Character.propTypes = { character: ImmutablePropTypes.map.isRequired };

const mapStateToProps = state => ({ character: state.get('character') });

export default connect(mapStateToProps)(Character);
