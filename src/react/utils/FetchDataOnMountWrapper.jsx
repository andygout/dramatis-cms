import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

import { ErrorMessage, Footer, Header, Navigation, Notification } from '../components';
import ScrollToTop from './ScrollToTop';
import { activateNotification } from '../../redux/actions/notification';
import { cancelRedirect } from '../../redux/actions/redirect';

const FetchDataOnMountWrapper = props => {

	const { path, documentTitle, error, notification, redirect, children } = props;

	const location = useLocation();
	const match = useMatch(path);
	const navigate = useNavigate();

	useEffect(() => {

		const { fetchData, dispatch } = props;

		if (fetchData) fetchData.map(fetchDataFunction => fetchDataFunction(dispatch, match));

		if (location.state?.isRedirectActive) {

			dispatch(cancelRedirect());

			dispatch(activateNotification(location.state?.notification));

		}

	}, []);

	useEffect(() => {

		if (redirect.get('isActive')) {

			const redirectOptions = {
				state: {
					isRedirectActive: true,
					notification: redirect.get('notification')
				}
			};

			navigate(redirect.get('path'), redirectOptions);

		}

	}, [redirect]);

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
						<ScrollToTop />
					)
				}

				{
					notification.get('isActive') && (
						<Notification
							text={notification.get('text')}
							status={notification.get('status')}
						/>
					)
				}

				{
					error.get('isExistent')
						? <ErrorMessage errorText={error.get('message')} />
						: children
				}

			</main>

			<Footer />

		</React.Fragment>
	);

};

FetchDataOnMountWrapper.propTypes = {
	path: PropTypes.string.isRequired,
	documentTitle: PropTypes.func.isRequired,
	fetchData: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired,
	error: ImmutablePropTypes.map.isRequired,
	notification: ImmutablePropTypes.map.isRequired,
	redirect: ImmutablePropTypes.map.isRequired,
	children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
	error: state.get('error'),
	notification: state.get('notification'),
	redirect: state.get('redirect')
});

export default connect(mapStateToProps)(FetchDataOnMountWrapper);
