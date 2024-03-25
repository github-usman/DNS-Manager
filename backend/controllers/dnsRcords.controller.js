import client from "../services/aws-sdk-route53.js"
import { ChangeResourceRecordSetsCommand, ListResourceRecordSetsCommand } from "@aws-sdk/client-route-53";
import { HostedZoneId, defaultTTL } from "../config/config.js";
import { listExistingRecords } from "../utils/isRecordExist.js";
import { getAllDNSRecords } from "./dns/getAllDNSRecords.controller.js";
import { createMultiDNSRecords } from "./dns/createMultiDNSRecords.controller.js";
import { createOneDNSRecords } from "./dns/createOneDNSRecords.controller.js";
import { deleteDNSRecord } from "./dns/deleteDNSRecords.controller.js";


// ---------------GET all dns record
export const getAllDNSRecordsHandler = async (req, res) => {
    try {
      const records = await getAllDNSRecords(req,res,client,ListResourceRecordSetsCommand,HostedZoneId);
      res.status(200).json(records);
    } catch (error) {
      console.error('Error retrieving DNS records:', error);
      res.status(500).json({ error: 'Error retrieving DNS records' });
    }
  };
  

// ---------------CREATE group of dns record ( bulk data)

export const createMultiDNSRecordsHandler = async (req, res) => {
    try {
      const result = await createMultiDNSRecords(req,res,client,ChangeResourceRecordSetsCommand,HostedZoneId,defaultTTL);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating DNS records:', error);
      res.status(500).json({ error: 'Error creating DNS records' });
    }
  };



// -------------CREATE single dns record only
export const createOneDNSRecordsHandler = async (req, res) => {
    try {
      const result = await createOneDNSRecords(req,res,client,ChangeResourceRecordSetsCommand,HostedZoneId,defaultTTL);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating DNS records:', error);
      res.status(500).json({ error: 'Error creating DNS records' });
    }
  };



//  ********************UPDATE or UPSERT ********************
//  To implement UPSERT functionality based on an identifier like an ID, 
//  I typically used to check if the record already exists before deciding whether to create a new record or update an existing one
//  because Route 53 uses the combination of the record's name, type, and set identifier (if applicable) to uniquely identify records.

export const updateDNSRecordsHandler = async (req, res) => {
    try {
      const result = await updateDNSRecords(req,res,client,ChangeResourceRecordSetsCommand,HostedZoneId,defaultTTL,listExistingRecords);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error Updating DNS records:', error);
      res.status(500).json({ error: 'Error Updating DNS records' });
    }
  };


//  DELETE give records


export const deleteDNSRecordHandler = async (req, res) => {
    try {
      const result = await deleteDNSRecord(req,res,client,ChangeResourceRecordSetsCommand,HostedZoneId,listExistingRecords);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error deleting DNS records:', error);
      res.status(500).json({ error: 'Error deleting DNS records' });
    }
  };