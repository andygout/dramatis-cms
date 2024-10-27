import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers/index.js';

const Awards = props => {

	return (
		<ListWrapper
			instances={props.awards}
			pageTitleText='Awards'
		>
		</ListWrapper>
	);

};

Awards.propTypes = {
	awards: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	awards: state.awards
});

export default connect(mapStateToProps)(Awards);
