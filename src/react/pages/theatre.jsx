import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SharedInstancePageComponents from '../components/shared-instance-page-components';

class Theatre extends Component {

	render () {

		const { theatre } = this.props;

		return (
			<div>

				<SharedInstancePageComponents instance={theatre} />

				<pre>{ JSON.stringify(theatre, null, 4) }</pre>

			</div>
		);

	};

};

Theatre.propTypes = { theatre: PropTypes.object.isRequired };

const mapStateToProps = ({ theatre }) => ({ theatre });

export default connect(mapStateToProps)(Theatre);
