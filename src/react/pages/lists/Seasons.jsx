import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers/index.js';

const Seasons = props => {

	return (
		<ListWrapper
			instances={props.seasons}
			pageTitleText='Seasons'
		>
		</ListWrapper>
	);

};

Seasons.propTypes = {
	seasons: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	seasons: state.seasons
});

export default connect(mapStateToProps)(Seasons);
