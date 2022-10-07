import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListWrapper } from '../../utils';

const Characters = props => {

	return (
		<ListWrapper
			instances={props.characters}
			pageTitleText='Characters'
		>
		</ListWrapper>
	);

};

Characters.propTypes = {
	characters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	characters: state.characters
});

export default connect(mapStateToProps)(Characters);
