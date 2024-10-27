import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers/index.js';

const Materials = props => {

	return (
		<ListWrapper
			instances={props.materials}
			pageTitleText='Materials'
		>
		</ListWrapper>
	);

};

Materials.propTypes = {
	materials: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	materials: state.materials
});

export default connect(mapStateToProps)(Materials);
