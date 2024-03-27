import express from 'express';
import {
  createMultiDNSRecordsHandler,
  createOneDNSRecordsHandler,
  deleteDNSRecordHandler,
  getAllDNSRecordsHandler,
  updateDNSRecordsHandler,
} from '../controllers/dnsRcords.controller.js';

const router = express.Router();

router.get('/all', getAllDNSRecordsHandler);
router.post('/create-multi', createMultiDNSRecordsHandler);
router.post('/create-one', createOneDNSRecordsHandler);
router.post('/update', updateDNSRecordsHandler);
router.post('/delete', deleteDNSRecordHandler);

export default router;
