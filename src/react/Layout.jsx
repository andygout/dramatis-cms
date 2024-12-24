import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

import { ErrorMessage, Footer, Header, Navigation, Notification, ScrollToTop } from './components/index.js';
import { deactivateRedirect } from '../redux/action-handlers/redirect.js';
import { notificationActivated } from '../redux/actions/index.js';

const Layout = props => {

	const { path, documentTitle, error, notification, redirect, children } = props;

	const location = useLocation();
	const match = useMatch(path);
	const navigate = useNavigate();

	useEffect(() => {

		const { fetchData, deactivateError, deactivateNotification, dispatch } = props;

		if (fetchData) fetchData(dispatch, match);

		if (deactivateError) dispatch(deactivateError());

		if (deactivateNotification) dispatch(deactivateNotification());

		if (location.state?.isRedirectActive) {

			dispatch(deactivateRedirect());

			dispatch(notificationActivated(location.state.notification));

		}

	}, []);

	useEffect(() => {

		if (redirect.isActive) {

			const redirectOptions = {
				state: {
					isRedirectActive: true,
					notification: redirect.notification
				}
			};

			navigate(redirect.path, redirectOptions);

		}

	}, [redirect]);

	return (
		<>

			<Helmet
				defaultTitle='Dramatis'
				titleTemplate='%s | Dramatis'
				title={documentTitle()}
			/>

			<Header />

			<Navigation />

			<main className="main-content">

				{
					notification.isActive && (
						<ScrollToTop />
					)
				}

				{
					notification.isActive && (
						<Notification
							text={notification.text}
							status={notification.status}
						/>
					)
				}

				{
					error.isActive
						? <ErrorMessage errorText={error.message} />
						: children
				}

			</main>

			<Footer />

		</>
	);

};

Layout.propTypes = {
	path: PropTypes.string.isRequired,
	documentTitle: PropTypes.func.isRequired,
	fetchData: PropTypes.func,
	deactivateError: PropTypes.func,
	deactivateNotification: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	error: PropTypes.object.isRequired,
	notification: PropTypes.object.isRequired,
	redirect: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
	error: state.error,
	notification: state.notification,
	redirect: state.redirect
});

export default connect(mapStateToProps)(Layout);
