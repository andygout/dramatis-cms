import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ListWrapper } from '../../utils';

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
	awardCeremonies: ImmutablePropTypes.list.isRequired
};

const mapStateToProps = state => ({
	awardCeremonies: state.get('awardCeremonies')
});

export default connect(mapStateToProps)(AwardCeremonies);
