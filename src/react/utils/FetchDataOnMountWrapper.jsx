import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ErrorMessage, Footer, Header, Navigation, Notification } from '../components';
import { removeRedirectPath } from '../../redux/actions/model';

class FetchDataOnMountWrapper extends React.Component {

	componentDidMount () {

		const { fetchData, dispatch, match, location } = this.props;

		if (fetchData) fetchData.map(fetchDataFunction => fetchDataFunction(dispatch, match));

		if (location.state?.redirectPathOriginStateProp)
			dispatch(removeRedirectPath(location.state.redirectPathOriginStateProp));

	}

	render () {

		const { documentTitle, notification, error, children } = this.props;

		return (
			<React.Fragment>

				<Helmet
					defaultTitle='TheatreBase'
					titleTemplate='%s | TheatreBase'
					title={documentTitle()}
				/>

				<Header />

				<Navigation />

				<main className="main-content">

					{
						notification.get('isActive') && (
							<Notification
								text={notification.get('text')}
								status={notification.get('status')}
							/>
						)
					}

					{
						error.get('exists')
							? <ErrorMessage errorText={error.get('message')} />
							: children
					}

				</main>

				<Footer />

			</React.Fragment>
		);

	}

}

FetchDataOnMountWrapper.propTypes = {
	documentTitle: PropTypes.func.isRequired,
	notification: ImmutablePropTypes.map.isRequired,
	error: ImmutablePropTypes.map.isRequired,
	children: PropTypes.node.isRequired,
	fetchData: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	error: state.get('error'),
	notification: state.get('notification')
});

export default connect(mapStateToProps)(FetchDataOnMountWrapper);
