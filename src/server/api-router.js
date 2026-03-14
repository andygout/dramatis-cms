import { Router } from 'express';

import {
	deleteController as instancesDeleteController,
	getController as instancesGetController,
	postController as instancesPostController,
	putController as instancesPutController
} from './controllers/instances/index.js';
import { getController as listsGetController } from './controllers/lists/index.js';
import { getController as searchGetController } from './controllers/search/index.js';

const router = new Router();

router.get('/awards/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/awards', (request, response, next) => instancesPostController(request, response, next));
router.get('/awards/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/awards/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/awards/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/awards', (request, response, next) => listsGetController(request, response, next));

router.get('/award-ceremonies/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/award-ceremonies', (request, response, next) => instancesPostController(request, response, next));
router.get('/award-ceremonies/:uuid/edit', (request, response, next) =>
	instancesGetController(request, response, next)
);
router.put('/award-ceremonies/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/award-ceremonies/:uuid', (request, response, next) =>
	instancesDeleteController(request, response, next)
);
router.get('/award-ceremonies', (request, response, next) => listsGetController(request, response, next));

router.get('/characters/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/characters', (request, response, next) => instancesPostController(request, response, next));
router.get('/characters/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/characters/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/characters/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/characters', (request, response, next) => listsGetController(request, response, next));

router.get('/companies/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/companies', (request, response, next) => instancesPostController(request, response, next));
router.get('/companies/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/companies/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/companies/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/companies', (request, response, next) => listsGetController(request, response, next));

router.get('/festivals/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/festivals', (request, response, next) => instancesPostController(request, response, next));
router.get('/festivals/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/festivals/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/festivals/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/festivals', (request, response, next) => listsGetController(request, response, next));

router.get('/festival-serieses/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/festival-serieses', (request, response, next) => instancesPostController(request, response, next));
router.get('/festival-serieses/:uuid/edit', (request, response, next) =>
	instancesGetController(request, response, next)
);
router.put('/festival-serieses/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/festival-serieses/:uuid', (request, response, next) =>
	instancesDeleteController(request, response, next)
);
router.get('/festival-serieses', (request, response, next) => listsGetController(request, response, next));

router.get('/materials/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/materials', (request, response, next) => instancesPostController(request, response, next));
router.get('/materials/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/materials/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/materials/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/materials', (request, response, next) => listsGetController(request, response, next));

router.get('/people/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/people', (request, response, next) => instancesPostController(request, response, next));
router.get('/people/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/people/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/people/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/people', (request, response, next) => listsGetController(request, response, next));

router.get('/productions/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/productions', (request, response, next) => instancesPostController(request, response, next));
router.get('/productions/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/productions/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/productions/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/productions', (request, response, next) => listsGetController(request, response, next));

router.get('/seasons/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/seasons', (request, response, next) => instancesPostController(request, response, next));
router.get('/seasons/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/seasons/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/seasons/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/seasons', (request, response, next) => listsGetController(request, response, next));

router.get('/search', (request, response, next) => searchGetController(request, response, next));

router.get('/venues/new', (request, response, next) => instancesGetController(request, response, next));
router.post('/venues', (request, response, next) => instancesPostController(request, response, next));
router.get('/venues/:uuid/edit', (request, response, next) => instancesGetController(request, response, next));
router.put('/venues/:uuid', (request, response, next) => instancesPutController(request, response, next));
router.delete('/venues/:uuid', (request, response, next) => instancesDeleteController(request, response, next));
router.get('/venues', (request, response, next) => listsGetController(request, response, next));

export default router;
