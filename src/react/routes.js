import {
	Award,
	Awards,
	AwardCeremony,
	AwardCeremonies,
	Character,
	Characters,
	Company,
	Companies,
	Festival,
	Festivals,
	FestivalSeries,
	FestivalSerieses,
	Material,
	Materials,
	Person,
	People,
	Production,
	Productions,
	Season,
	Seasons,
	Venue,
	Venues,
	Home,
	NotFound
} from './pages/index.js';
import { deactivateError } from '../redux/action-handlers/error.js';
import { deactivateNotification } from '../redux/action-handlers/notification.js';

export default [
	{
		path: '/',
		pageTitle: 'Home',
		component: Home,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards',
		pageTitle: 'Awards',
		component: Awards,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards/new',
		pageTitle: 'New award',
		component: Award,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards/:uuid',
		pageTitle: 'Award',
		component: Award,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies',
		pageTitle: 'Award ceremonies',
		component: AwardCeremonies,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies/new',
		pageTitle: 'New award ceremony',
		component: AwardCeremony,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies/:uuid',
		pageTitle: 'Award ceremony',
		component: AwardCeremony,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters',
		pageTitle: 'Characters',
		component: Characters,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters/new',
		pageTitle: 'New character',
		component: Character,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters/:uuid',
		pageTitle: 'Character',
		component: Character,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies',
		pageTitle: 'Companies',
		component: Companies,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies/new',
		pageTitle: 'New company',
		component: Company,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies/:uuid',
		pageTitle: 'Company',
		component: Company,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals',
		pageTitle: 'Festivals',
		component: Festivals,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals/new',
		pageTitle: 'New festival',
		component: Festival,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals/:uuid',
		pageTitle: 'Festival',
		component: Festival,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses',
		pageTitle: 'Festival serieses',
		component: FestivalSerieses,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses/new',
		pageTitle: 'New festival series',
		component: FestivalSeries,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses/:uuid',
		pageTitle: 'Festival series',
		component: FestivalSeries,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials',
		pageTitle: 'Materials',
		component: Materials,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials/new',
		pageTitle: 'New material',
		component: Material,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials/:uuid',
		pageTitle: 'Material',
		component: Material,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people',
		pageTitle: 'People',
		component: People,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people/new',
		pageTitle: 'New person',
		component: Person,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people/:uuid',
		pageTitle: 'Person',
		component: Person,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions',
		pageTitle: 'Productions',
		component: Productions,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions/new',
		pageTitle: 'New production',
		component: Production,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions/:uuid',
		pageTitle: 'Production',
		component: Production,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons',
		pageTitle: 'Seasons',
		component: Seasons,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons/new',
		pageTitle: 'New season',
		component: Season,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons/:uuid',
		pageTitle: 'Season',
		component: Season,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues',
		pageTitle: 'Venues',
		component: Venues,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues/new',
		pageTitle: 'New venue',
		component: Venue,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues/:uuid',
		pageTitle: 'Venue',
		component: Venue,
		deactivateError,
		deactivateNotification
	},
	{
		path: '*',
		pageTitle: 'Not Found',
		component: NotFound,
		deactivateError: null,
		deactivateNotification
	}
];
