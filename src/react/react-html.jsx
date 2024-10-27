import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server.js';

import AppRoutes from './AppRoutes.jsx';

export default (request, store) =>
	renderToString(
		<Provider store={store}>
			<StaticRouter location={request.url} context={{}}>
				<AppRoutes />
			</StaticRouter>
		</Provider>
	);
