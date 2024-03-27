//  ********************UPDATE or UPSERT ********************
//  To implement UPSERT functionality based on an identifier like an ID,
//  I typically used to check if the record already exists before deciding whether to create a new record or update an existing one
//  because Route 53 uses the combination of the record's name, type, and set identifier (if applicable) to uniquely identify records.

export const updateDNSRecords = async (
  req,
  res,
  client,
  ChangeResourceRecordSetsCommand,
  HostedZoneId,
  defaultTTL,
  listExistingRecords,
) => {
  const dnsRecords = req.body;
  try {
    console.log(dnsRecords);
    for (const record of dnsRecords) {
      const existingRecords = await listExistingRecords(
        record.Name,
        record.Type,
      );
      if (existingRecords.length > 0) {
        // if record exsit then update
        const updateParams = {
          HostedZoneId,
          ChangeBatch: {
            Changes: [
              {
                Action: 'UPSERT',
                ResourceRecordSet: {
                  Name: record.Name,
                  Type: record.Type,
                  TTL: record.TTL || defaultTTL,
                  ResourceRecords: record.ResourceRecords.map((value) => ({
                    Value: value.Value,
                  })),
                },
              },
            ],
          },
        };

        const updateCommand = new ChangeResourceRecordSetsCommand(updateParams);
        await client.send(updateCommand);

        console.log('Record updated successfully:', record);
        console.log(
          'Record already exists. Updating record:',
          existingRecords[0],
        );
      } else {
        // ***********call FUNCTION to create new record**************
        console.log(
          'now calling creating controller or funtion to create new record',
        );
        createOneDNSRecords(req, res);
        console.log('Creating new record:', record);
      }
    }
    res
      .status(201)
      .json({ message: 'DNS records created/updated successfully' });
  } catch (error) {
    console.error('Error creating/updating DNS records:', error);
    res.status(500).json({ error: 'Error creating/updating DNS records' });
  }
};
