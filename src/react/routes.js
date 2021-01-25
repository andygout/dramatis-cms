import {
	Character,
	Characters,
	Company,
	Companies,
	Material,
	Materials,
	Person,
	People,
	Production,
	Productions,
	Theatre,
	Theatres,
	Home,
	NotFound
} from './pages';

import { cancelError } from '../redux/actions/error';
import { fetchList, fetchInstanceTemplate, fetchInstance } from '../redux/actions/model';
import { deactivateNotification } from '../redux/actions/notification';

export default [
	{
		path: '/',
		exact: true,
		documentTitle: () => 'Home',
		component: Home,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification())
		]
	},
	{
		path: '/characters',
		exact: true,
		documentTitle: () => 'Characters',
		component: Characters,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList('characters'))
		]
	},
	{
		path: '/characters/new',
		exact: true,
		documentTitle: () => 'New character',
		component: Character,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate('character'))
		]
	},
	{
		path: '/characters/:uuid',
		documentTitle: () => 'Character',
		component: Character,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('character', uuid))
		]
	},
	{
		path: '/companies',
		exact: true,
		documentTitle: () => 'Companies',
		component: Companies,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList('companies'))
		]
	},
	{
		path: '/companies/new',
		exact: true,
		documentTitle: () => 'New company',
		component: Company,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate('company'))
		]
	},
	{
		path: '/companies/:uuid',
		documentTitle: () => 'Company',
		component: Company,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('company', uuid))
		]
	},
	{
		path: '/materials',
		exact: true,
		documentTitle: () => 'Materials',
		component: Materials,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList('materials'))
		]
	},
	{
		path: '/materials/new',
		exact: true,
		documentTitle: () => 'New material',
		component: Material,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate('material'))
		]
	},
	{
		path: '/materials/:uuid',
		documentTitle: () => 'Material',
		component: Material,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('material', uuid))
		]
	},
	{
		path: '/people',
		exact: true,
		documentTitle: () => 'People',
		component: People,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList('people'))
		]
	},
	{
		path: '/people/new',
		exact: true,
		documentTitle: () => 'New person',
		component: Person,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate('person'))
		]
	},
	{
		path: '/people/:uuid',
		documentTitle: () => 'Person',
		component: Person,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('person', uuid))
		]
	},
	{
		path: '/productions',
		exact: true,
		documentTitle: () => 'Productions',
		component: Productions,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList('productions'))
		]
	},
	{
		path: '/productions/new',
		exact: true,
		documentTitle: () => 'New production',
		component: Production,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate('production'))
		]
	},
	{
		path: '/productions/:uuid',
		documentTitle: () => 'Production',
		component: Production,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('production', uuid))
		]
	},
	{
		path: '/theatres',
		exact: true,
		documentTitle: () => 'Theatres',
		component: Theatres,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList('theatres'))
		]
	},
	{
		path: '/theatres/new',
		exact: true,
		documentTitle: () => 'New theatre',
		component: Theatre,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate('theatre'))
		]
	},
	{
		path: '/theatres/:uuid',
		documentTitle: () => 'Theatre',
		component: Theatre,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance('theatre', uuid))
		]
	},
	{
		path: '*',
		documentTitle: () => 'Not Found',
		component: NotFound,
		fetchData: [
			dispatch => dispatch(deactivateNotification())
		]
	}
];
