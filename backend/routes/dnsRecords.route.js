import express from "express"
import {  createDNSRecords, createOneDNSRecords, deleteDNSRecord, getAllDNSRecords, updateDNSRecords } from "../controllers/dnsRcords.controller.js";


const router = express.Router();

router.get("/all",getAllDNSRecords)
router.post("/create",createDNSRecords)
router.post("/create-one",createOneDNSRecords)
router.post("/update",updateDNSRecords)
router.post("/delete",deleteDNSRecord)


export default router;