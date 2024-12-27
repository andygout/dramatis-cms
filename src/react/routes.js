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
		documentTitle: () => 'Home',
		component: Home,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards',
		documentTitle: () => 'Awards',
		component: Awards,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards/new',
		documentTitle: () => 'New award',
		component: Award,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards/:uuid',
		documentTitle: () => 'Award',
		component: Award,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies',
		documentTitle: () => 'Award ceremonies',
		component: AwardCeremonies,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies/new',
		documentTitle: () => 'New award ceremony',
		component: AwardCeremony,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies/:uuid',
		documentTitle: () => 'Award ceremony',
		component: AwardCeremony,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters',
		documentTitle: () => 'Characters',
		component: Characters,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters/new',
		documentTitle: () => 'New character',
		component: Character,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters/:uuid',
		documentTitle: () => 'Character',
		component: Character,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies',
		documentTitle: () => 'Companies',
		component: Companies,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies/new',
		documentTitle: () => 'New company',
		component: Company,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies/:uuid',
		documentTitle: () => 'Company',
		component: Company,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals',
		documentTitle: () => 'Festivals',
		component: Festivals,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals/new',
		documentTitle: () => 'New festival',
		component: Festival,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals/:uuid',
		documentTitle: () => 'Festival',
		component: Festival,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses',
		documentTitle: () => 'Festival serieses',
		component: FestivalSerieses,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses/new',
		documentTitle: () => 'New festival series',
		component: FestivalSeries,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses/:uuid',
		documentTitle: () => 'Festival series',
		component: FestivalSeries,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials',
		documentTitle: () => 'Materials',
		component: Materials,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials/new',
		documentTitle: () => 'New material',
		component: Material,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials/:uuid',
		documentTitle: () => 'Material',
		component: Material,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people',
		documentTitle: () => 'People',
		component: People,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people/new',
		documentTitle: () => 'New person',
		component: Person,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people/:uuid',
		documentTitle: () => 'Person',
		component: Person,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions',
		documentTitle: () => 'Productions',
		component: Productions,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions/new',
		documentTitle: () => 'New production',
		component: Production,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions/:uuid',
		documentTitle: () => 'Production',
		component: Production,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons',
		documentTitle: () => 'Seasons',
		component: Seasons,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons/new',
		documentTitle: () => 'New season',
		component: Season,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons/:uuid',
		documentTitle: () => 'Season',
		component: Season,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues',
		documentTitle: () => 'Venues',
		component: Venues,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues/new',
		documentTitle: () => 'New venue',
		component: Venue,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues/:uuid',
		documentTitle: () => 'Venue',
		component: Venue,
		deactivateError,
		deactivateNotification
	},
	{
		path: '*',
		documentTitle: () => 'Not Found',
		component: NotFound,
		deactivateError: null,
		deactivateNotification
	}
];
