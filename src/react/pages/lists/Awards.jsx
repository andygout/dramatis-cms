import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListWrapper } from '../../utils';

class Awards extends React.Component {

	render () {

		return (
			<ListWrapper
				instances={this.props.awards}
				pageTitleText='Awards'
			>
			</ListWrapper>
		);

	}

}

Awards.propTypes = {
	awards: PropTypes.instanceOf(List).isRequired
};

const mapStateToProps = state => ({
	awards: state.get('awards')
});

export default connect(mapStateToProps)(Awards);
