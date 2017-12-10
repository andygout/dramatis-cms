import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SharedInstancePageComponents from '../components/shared-instance-page-components';

class Production extends Component {

	render () {

		const { production } = this.props;

		return (
			<div>

				<SharedInstancePageComponents instance={production} />

				<pre>{ JSON.stringify(production, null, 4) }</pre>

			</div>
		);

	};

};

Production.propTypes = { production: PropTypes.object.isRequired };

const mapStateToProps = ({ production }) => ({ production });

export default connect(mapStateToProps)(Production);
