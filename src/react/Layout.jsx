import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { ErrorMessage, Footer, Header, Navigation, Notification, ScrollToTop } from './components/index.js';
import { deactivateRedirect } from '../redux/action-handlers/redirect.js';
import { notificationActivated } from '../redux/actions/index.js';

const Layout = props => {

	const { documentTitle, children } = props;

	const dispatch = useDispatch();

	const error = useSelector(state => state.error);
	const notification = useSelector(state => state.notification);
	const redirect = useSelector(state => state.redirect);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {

		const { deactivateError, deactivateNotification } = props;

		if (deactivateError) dispatch(deactivateError());

		if (deactivateNotification) dispatch(deactivateNotification());

		if (redirect.isActive) {

			dispatch(deactivateRedirect());

			dispatch(notificationActivated(location.state.notification));

		}

	}, []);

	useEffect(() => {

		if (redirect.isActive) {

			const redirectOptions = {
				state: {
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

export default Layout;
