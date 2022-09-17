import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ListWrapper } from '../../utils';

const Companies = props => {

	return (
		<ListWrapper
			instances={props.companies}
			pageTitleText='Companies'
		>
		</ListWrapper>
	);

};

Companies.propTypes = {
	companies: ImmutablePropTypes.list.isRequired
};

const mapStateToProps = state => ({
	companies: state.get('companies')
});

export default connect(mapStateToProps)(Companies);
