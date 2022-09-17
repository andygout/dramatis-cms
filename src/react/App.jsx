import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';
import { FetchDataOnMountWrapper } from './utils';

const App = () => {

	return (
		<Switch>
			{
				routes.map((route, index) => {
					const RouteComponent = route.component;

					return (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
						>
							<FetchDataOnMountWrapper
								documentTitle={route.documentTitle}
								fetchData={route.fetchData}
							>
								<RouteComponent />
							</FetchDataOnMountWrapper>
						</Route>
					);
				})
			}
		</Switch>
	);

};

export default App;
