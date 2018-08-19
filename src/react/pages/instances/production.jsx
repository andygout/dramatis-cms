import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstanceWrapper from '../../utils/instance-wrapper';

class Production extends Component {

	render () {

		return (
			<InstanceWrapper
				instance={this.props.production}
			>
			</InstanceWrapper>
		);

	};

};

Production.propTypes = { production: PropTypes.object.isRequired };

const mapStateToProps = ({ production }) => ({ production });

export default connect(mapStateToProps)(Production);
