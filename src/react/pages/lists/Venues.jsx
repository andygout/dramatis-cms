import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListWrapper } from '../../utils';

class Venues extends React.Component {

	render () {

		return (
			<ListWrapper
				instances={this.props.venues}
				pageTitleText='Venues'
			>
			</ListWrapper>
		);

	}

}

Venues.propTypes = {
	venues: PropTypes.instanceOf(List).isRequired
};

const mapStateToProps = state => ({
	venues: state.get('venues')
});

export default connect(mapStateToProps)(Venues);
