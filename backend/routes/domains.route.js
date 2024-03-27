import express from 'express';
import {
  createHostedZoneHandler,
  deleteHostedZoneHandler,
  listHostedZonesHandler,
} from '../controllers/domains.controller.js';

const router = express.Router();

router.get('/all', listHostedZonesHandler);
router.post('/create', createHostedZoneHandler);
router.post('/delete', deleteHostedZoneHandler);

export default router;
