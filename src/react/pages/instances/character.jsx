import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstanceWrapper from '../../utils/instance-wrapper';

class Character extends Component {

	render () {

		return (
			<InstanceWrapper
				instance={this.props.character}
			>
			</InstanceWrapper>
		);

	};

};

Character.propTypes = { character: PropTypes.object.isRequired };

const mapStateToProps = ({ character }) => ({ character });

export default connect(mapStateToProps)(Character);
