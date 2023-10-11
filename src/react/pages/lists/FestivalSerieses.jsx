import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers';

const FestivalSerieses = props => {

	return (
		<ListWrapper
			instances={props.festivalSerieses}
			pageTitleText='Festival serieses'
		>
		</ListWrapper>
	);

};

FestivalSerieses.propTypes = {
	festivalSerieses: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	festivalSerieses: state.festivalSerieses
});

export default connect(mapStateToProps)(FestivalSerieses);
