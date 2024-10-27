import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers/index.js';

const AwardCeremonies = props => {

	return (
		<ListWrapper
			instances={props.awardCeremonies}
			pageTitleText='Award ceremonies'
		>
		</ListWrapper>
	);

};

AwardCeremonies.propTypes = {
	awardCeremonies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	awardCeremonies: state.awardCeremonies
});

export default connect(mapStateToProps)(AwardCeremonies);
