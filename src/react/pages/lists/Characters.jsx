import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers/index.js';

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
