// ---------------CREATE group of dns record ( bulk data)

export const createMultiDNSRecords = async (
  req,
  res,
  client,
  ChangeResourceRecordSetsCommand,
  defaultTTL,
) => {
  const dnsRecords = req.body; // in this body is an array of DNS records
  const { HostedZoneId } = req.query;
  try {
    const changeBatch = {
      Changes: dnsRecords.map((record) => ({
        Action: 'CREATE',
        ResourceRecordSet: {
          Name: record.Name,
          Type: record.Type,
          TTL: record.TTL || defaultTTL,
          ResourceRecords: record.ResourceRecords.map((value) => ({
            Value: value.Value, // Assuming the value is a string without spaces
          })),
        },
      })),
    };

    const params = {
      HostedZoneId,
      ChangeBatch: changeBatch,
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
