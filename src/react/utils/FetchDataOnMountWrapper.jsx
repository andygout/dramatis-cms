import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

import { ErrorMessage, Footer, Header, Navigation, Notification } from '../components';
import ScrollToTop from './ScrollToTop';
import { cancelRedirectPath } from '../../redux/actions/redirect-path';

const isClientSide = typeof window !== 'undefined';
const useIsomorphicEffect = isClientSide ? useLayoutEffect : useEffect;

const FetchDataOnMountWrapper = props => {

	const { path, documentTitle, error, notification, redirectPath, children } = props;

	const location = useLocation();
	const match = useMatch(path);
	const navigate = useNavigate();

	useIsomorphicEffect(() => {

		const { fetchData, dispatch } = props;

		if (fetchData) fetchData.map(fetchDataFunction => fetchDataFunction(dispatch, match));

		if (location.state?.isRedirectPathPresent) dispatch(cancelRedirectPath());

	}, []);

	useEffect(() => {

		if (redirectPath) navigate(redirectPath, { state: { isRedirectPathPresent: true } });

	}, [redirectPath]);

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
	redirectPath: PropTypes.string,
	children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
	error: state.get('error'),
	notification: state.get('notification'),
	redirectPath: state.get('redirectPath')
});

export default connect(mapStateToProps)(FetchDataOnMountWrapper);
