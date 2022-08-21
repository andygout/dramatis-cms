import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ListWrapper } from '../../utils';

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
	awards: ImmutablePropTypes.list.isRequired
};

const mapStateToProps = state => ({
	awards: state.get('awards')
});

export default connect(mapStateToProps)(Awards);
