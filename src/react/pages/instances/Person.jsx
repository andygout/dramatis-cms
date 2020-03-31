import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import InstanceWrapper from '../../utils/InstanceWrapper';

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

Person.propTypes = { person: ImmutablePropTypes.map.isRequired };

const mapStateToProps = state => ({ person: state.get('person') });

export default connect(mapStateToProps)(Person);
