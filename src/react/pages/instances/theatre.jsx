import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstanceWrapper from '../../utils/instance-wrapper';

class Theatre extends Component {

	render () {

		return (
			<InstanceWrapper
				instance={this.props.theatre}
			>
			</InstanceWrapper>
		);

	};

};

Theatre.propTypes = { theatre: PropTypes.object.isRequired };

const mapStateToProps = ({ theatre }) => ({ theatre });

export default connect(mapStateToProps)(Theatre);
