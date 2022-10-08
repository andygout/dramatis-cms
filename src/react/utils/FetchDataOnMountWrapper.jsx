import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
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
					error.isExistent
						? <ErrorMessage errorText={error.message} />
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

export default connect(mapStateToProps)(FetchDataOnMountWrapper);
