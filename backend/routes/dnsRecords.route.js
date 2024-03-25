import express from "express"
import {  createDNSRecords, createOneDNSRecords, getAllDNSRecords } from "../controllers/dnsRcords.controller.js";


const router = express.Router();

router.get("/all",getAllDNSRecords)
router.post("/create",createDNSRecords)
router.post("/create-one",createOneDNSRecords)
// router.post("/add",)


export default router;