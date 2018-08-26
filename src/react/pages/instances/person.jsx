import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import InstanceWrapper from '../../utils/instance-wrapper';

class Person extends React.Component {

	render () {

		return (
			<InstanceWrapper
				instance={this.props.person}
			>
			</InstanceWrapper>
		);

	};

};

Person.propTypes = { person: PropTypes.object.isRequired };

const mapStateToProps = ({ person }) => ({ person });

export default connect(mapStateToProps)(Person);
