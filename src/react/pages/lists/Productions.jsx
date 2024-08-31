import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers/index.js';

const Productions = props => {

	return (
		<ListWrapper
			instances={props.productions}
			pageTitleText='Productions'
		>
		</ListWrapper>
	);

};

Productions.propTypes = {
	productions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	productions: state.productions
});

export default connect(mapStateToProps)(Productions);
