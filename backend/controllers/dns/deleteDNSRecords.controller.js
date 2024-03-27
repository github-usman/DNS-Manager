//  DELETE give records from dns record

export const deleteDNSRecord = async (
  req,
  res,
  client,
  ChangeResourceRecordSetsCommand,
  HostedZoneId,
  listExistingRecords,
) => {
  const dnsRecords = req.body;
  try {
    for (const record of dnsRecords) {
      const existingRecords = await listExistingRecords(
        record.Name,
        record.Type,
      );
      if (existingRecords.length > 0) {
        // Delete existing record
        const deleteParams = {
          HostedZoneId,
          ChangeBatch: {
            Changes: [
              {
                Action: 'DELETE',
                ResourceRecordSet: record,
              },
            ],
          },
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
    res
      .status(500)
      .json({ error: 'Error creating/updating/deleting DNS records' });
  }
};
