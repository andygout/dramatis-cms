import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router-dom';

import { ErrorMessage, Footer, Header, Navigation, Notification } from '../components';
import ScrollToTop from './ScrollToTop';
import { removeRedirectPath } from '../../redux/actions/model';

const isClientSide = typeof window !== 'undefined';
const useIsomorphicEffect = isClientSide ? useLayoutEffect : useEffect;

const FetchDataOnMountWrapper = props => {

	const { documentTitle, notification, error, children } = props;

	const location = useLocation();
	const match = useRouteMatch();

	useIsomorphicEffect(() => {

		const { fetchData, dispatch } = props;

		if (fetchData) fetchData.map(fetchDataFunction => fetchDataFunction(dispatch, match));

		if (location.state?.redirectPathOriginStateProp)
			dispatch(removeRedirectPath(location.state.redirectPathOriginStateProp));

	}, []);

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
	documentTitle: PropTypes.func.isRequired,
	notification: ImmutablePropTypes.map.isRequired,
	error: ImmutablePropTypes.map.isRequired,
	children: PropTypes.node.isRequired,
	fetchData: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	error: state.get('error'),
	notification: state.get('notification')
});

export default connect(mapStateToProps)(FetchDataOnMountWrapper);
