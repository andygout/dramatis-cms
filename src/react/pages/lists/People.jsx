import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers';

const People = props => {

	return (
		<ListWrapper
			instances={props.people}
			pageTitleText='People'
		>
		</ListWrapper>
	);

};

People.propTypes = {
	people: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	people: state.people
});

export default connect(mapStateToProps)(People);
