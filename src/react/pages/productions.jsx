import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../components/page-title';

class Productions extends Component {

	render () {

		return (
			<div>

				<PageTitle pageTitle='Productions' />

				<pre>{ JSON.stringify(this.props.productions, null, 4) }</pre>

			</div>
		);

	};

};

Productions.propTypes = { productions: PropTypes.array.isRequired };

const mapStateToProps = ({ productions }) => ({ productions });

export default connect(mapStateToProps)(Productions);
