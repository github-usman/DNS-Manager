import {HostedZoneId, defaultTTL } from "../config/config.js";
import { ChangeResourceRecordSetsCommand, ListResourceRecordSetsCommand } from "@aws-sdk/client-route-53";
import client from "../services/aws-sdk-route53.js"


// ---------------get all dns record
export const getAllDNSRecords = async (req, res) => {
  try {
      const params = {
          HostedZoneId
      };

      const command = new ListResourceRecordSetsCommand(params);
      const data = await client.send(command);

      res.status(200).json(data);
  } catch (error) {
      console.error('Error retrieving DNS records:', error);
      res.status(500).json({ error: 'Error retrieving DNS records' });
  }
};



// ---------------group of bulk data

export const createDNSRecords = async (req, res) => {
  const dnsRecords = req.body; // in this body is an array of DNS records
  try {
      const changeBatch = {
          Changes: dnsRecords.map(record => ({
              Action: 'CREATE',
              ResourceRecordSet: {
                  Name: record.Name,
                  Type: record.Type,
                  TTL: record.TTL || defaultTTL,
                  ResourceRecords: record.ResourceRecords.map(value => ({
                    Value: value.Value // Assuming the value is a string without spaces
                }))
              }
          }))
      };

      const params = {
          HostedZoneId,
          ChangeBatch:changeBatch
      };

      // Call Route 53 API to create DNS records
      const command = new ChangeResourceRecordSetsCommand(params);
      const data = await client.send(command);

      res.status(201).json({ message: 'DNS records created successfully', data });
  } catch (error) {
      console.error('Error creating DNS records:', error);
      res.status(500).json({ error: 'Error creating DNS records' });
  }
};




// -------------single dns record only
export const createOneDNSRecords = async (req, res) => {
  const { Name, Type, TTL, ResourceRecords } = req.body;
  try {
      const params = {
          HostedZoneId,
          ChangeBatch: {
              Changes: [{
                  Action: 'CREATE',
                  ResourceRecordSet: {
                      Name: Name,
                      Type: Type,
                      TTL: TTL || defaultTTL,
                      ResourceRecords: [{ Value: ResourceRecords[0].Value }]
                  }
              }]
          }
      };

      // Call Route 53 API to create DNS record
      const command = new ChangeResourceRecordSetsCommand(params);
      const data = await client.send(command);

      res.status(201).json({ message: 'DNS record created successfully', data });
  } catch (error) {
      console.error('Error creating DNS record:', error);
      res.status(500).json({ error: 'Error creating DNS record' });
  }
};

