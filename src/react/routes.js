import {
	Character,
	Characters,
	Person,
	People,
	Playtext,
	Playtexts,
	Production,
	Productions,
	Theatre,
	Theatres,
	Home,
	NotFound
} from './pages';

import { resetError } from '../redux/actions/error';
import { fetchList, fetchInstanceTemplate, fetchInstance } from '../redux/actions/model';

export default [
	{
		path: '/',
		exact: true,
		documentTitle: () => 'Home',
		component: Home,
		fetchData: [
			dispatch => dispatch(resetError())
		]
	},
	{
		path: '/characters',
		exact: true,
		documentTitle: () => 'Characters',
		component: Characters,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchList('characters'))
		]
	},
	{
		path: '/characters/new',
		exact: true,
		documentTitle: () => 'New character',
		component: Character,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchInstanceTemplate('character'))
		]
	},
	{
		path: '/characters/:uuid',
		documentTitle: () => 'Character',
		component: Character,
		fetchData: [
			dispatch => dispatch(resetError()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('character', uuid))
		]
	},
	{
		path: '/people',
		exact: true,
		documentTitle: () => 'People',
		component: People,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchList('people'))
		]
	},
	{
		path: '/people/new',
		exact: true,
		documentTitle: () => 'New person',
		component: Person,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchInstanceTemplate('person'))
		]
	},
	{
		path: '/people/:uuid',
		documentTitle: () => 'Person',
		component: Person,
		fetchData: [
			dispatch => dispatch(resetError()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('person', uuid))
		]
	},
	{
		path: '/playtexts',
		exact: true,
		documentTitle: () => 'Playtexts',
		component: Playtexts,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchList('playtexts'))
		]
	},
	{
		path: '/playtexts/new',
		exact: true,
		documentTitle: () => 'New playtext',
		component: Playtext,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchInstanceTemplate('playtext'))
		]
	},
	{
		path: '/playtexts/:uuid',
		documentTitle: () => 'Playtexts',
		component: Playtext,
		fetchData: [
			dispatch => dispatch(resetError()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('playtext', uuid))
		]
	},
	{
		path: '/productions',
		exact: true,
		documentTitle: () => 'Productions',
		component: Productions,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchList('productions'))
		]
	},
	{
		path: '/productions/new',
		exact: true,
		documentTitle: () => 'New production',
		component: Production,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchInstanceTemplate('production'))
		]
	},
	{
		path: '/productions/:uuid',
		documentTitle: () => 'Production',
		component: Production,
		fetchData: [
			dispatch => dispatch(resetError()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('production', uuid))
		]
	},
	{
		path: '/theatres',
		exact: true,
		documentTitle: () => 'Theatres',
		component: Theatres,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchList('theatres'))
		]
	},
	{
		path: '/theatres/new',
		exact: true,
		documentTitle: () => 'New theatre',
		component: Theatre,
		fetchData: [
			dispatch => dispatch(resetError()),
			dispatch => dispatch(fetchInstanceTemplate('theatre'))
		]
	},
	{
		path: '/theatres/:uuid',
		documentTitle: () => 'Theatre',
		component: Theatre,
		fetchData: [
			dispatch => dispatch(resetError()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('theatre', uuid))
		]
	},
	{
		path: '*',
		documentTitle: () => 'Not Found',
		component: NotFound
	}
];
