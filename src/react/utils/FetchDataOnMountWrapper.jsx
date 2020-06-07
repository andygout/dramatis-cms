import React from 'react';
import { Helmet } from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ErrorMessage, Footer, Header, Navigation } from '../components';

class FetchDataOnMountWrapper extends React.Component {

	componentDidMount () {

		const { fetchData, dispatch, match, location } = this.props;

		if (fetchData) fetchData.map(fetchDataFunction => fetchDataFunction(dispatch, match, location));

	};

	render () {

		const { props } = this;

		const { error } = props;

		return (
			<div className="page-container">

				<Helmet
					defaultTitle='TheatreBase'
					titleTemplate='%s | TheatreBase'
					title={props.documentTitle()}
				/>

				<Header/>

				<Navigation/>

				<main className="main-content">

					{
						error.get('exists')
							? <ErrorMessage errorText={error.get('message')}/>
							: props.children
					}

				</main>

				<Footer/>

			</div>
		);

	};

};

FetchDataOnMountWrapper.propTypes = { error: ImmutablePropTypes.map.isRequired };

const mapStateToProps = state => ({ error: state.get('error') });

export default connect(mapStateToProps)(FetchDataOnMountWrapper);
