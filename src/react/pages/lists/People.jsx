import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers/index.js';

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
