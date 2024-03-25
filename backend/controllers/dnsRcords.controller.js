import {HostedZoneId, defaultTTL } from "../config/config.js";
import { ChangeResourceRecordSetsCommand, ListResourceRecordSetsCommand } from "@aws-sdk/client-route-53";
import client from "../services/aws-sdk-route53.js"
import { listExistingRecords } from "../utils/isRecordExist.js";


// ---------------GET all dns record
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



// ---------------CREATE group of dns record ( bulk data)

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




// -------------CREATE single dns record only
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

     
      const command = new ChangeResourceRecordSetsCommand(params);  // Call Route 53 API to create DNS record
      const data = await client.send(command);

      res.status(201).json({ message: 'DNS record created successfully', data });
  } catch (error) {
      console.error('Error creating DNS record:', error);
      res.status(500).json({ error: 'Error creating DNS record' });
  }
};


//  ********************UPDATE or UPSERT ********************
//  To implement UPSERT functionality based on an identifier like an ID, 
//  I typically used to check if the record already exists before deciding whether to create a new record or update an existing one
//  because Route 53 uses the combination of the record's name, type, and set identifier (if applicable) to uniquely identify records.



export const updateDNSRecords = async (req, res) => {
    const dnsRecords = req.body;
    try {
      console.log(dnsRecords)
        for (const record of dnsRecords) {
            const existingRecords = await listExistingRecords(record.Name, record.Type);
            if (existingRecords.length > 0) {
              // if record exsit then update
                  const updateParams = {
                    HostedZoneId,
                    ChangeBatch: {
                        Changes: [{
                            Action: 'UPSERT',
                            ResourceRecordSet: {
                                Name: record.Name,
                                Type: record.Type,
                                TTL: record.TTL || defaultTTL,
                                ResourceRecords: record.ResourceRecords.map(value => ({
                                    Value: value.Value
                                }))
                            }
                        }]
                    }
                };

                const updateCommand = new ChangeResourceRecordSetsCommand(updateParams);
                await client.send(updateCommand);

                console.log('Record updated successfully:', record);
                console.log('Record already exists. Updating record:', existingRecords[0]);
            } else {

              // ***********call FUNCTION to create new record**************
                console.log('now calling creating controller or funtion to create new record')
                 createOneDNSRecords(req,res);
                console.log('Creating new record:', record);
            }
        }
        res.status(201).json({ message: 'DNS records created/updated successfully' });
    } catch (error) {
        console.error('Error creating/updating DNS records:', error);
        res.status(500).json({ error: 'Error creating/updating DNS records' });
    }
};

//  DELETE give records


export const deleteDNSRecord = async (req, res) => {
    const dnsRecords = req.body;
    try {
        for (const record of dnsRecords) {
            const existingRecords = await listExistingRecords(record.Name, record.Type);
            if (existingRecords.length > 0) {
                // Delete existing record
                const deleteParams = {
                    HostedZoneId,
                    ChangeBatch: {
                        Changes: [{
                            Action: 'DELETE',
                            ResourceRecordSet: record
                        }]
                    }
                };

                const deleteCommand = new ChangeResourceRecordSetsCommand(deleteParams);
                await client.send(deleteCommand);

                console.log('Record deleted successfully:', record);
            } else {
                console.log('Record does not exist. Skipping deletion:', record);
            }
        }
        res.status(201).json({ message: 'DNS records deleted successfully' });
    } catch (error) {
        console.error('Error creating/updating/deleting DNS records:', error);
        res.status(500).json({ error: 'Error creating/updating/deleting DNS records' });
    }
};
