import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers/index.js';

const Festivals = props => {

	return (
		<ListWrapper
			instances={props.festivals}
			pageTitleText='Festivals'
		>
		</ListWrapper>
	);

};

Festivals.propTypes = {
	festivals: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	festivals: state.festivals
});

export default connect(mapStateToProps)(Festivals);
