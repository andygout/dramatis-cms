import { Map } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { PlaytextForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class Playtext extends React.Component {

	render () {

		const { playtext, playtextFormData } = this.props;

		return (
			<InstanceWrapper
				instance={playtext}
				formAction={playtextFormData.get('action')}
			>

				<PlaytextForm
					instance={playtextFormData.get('instance', Map())}
					action={playtextFormData.get('action', 'Submit')}
					redirectPath={playtextFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

Playtext.propTypes = {
	playtext: ImmutablePropTypes.map.isRequired,
	playtextFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	playtext: state.get('playtext'),
	playtextFormData: state.get('playtextFormData')
});

export default connect(mapStateToProps)(Playtext);
