// -------------CREATE single dns record only

export const createOneDNSRecords = async (
  req,
  res,
  client,
  ChangeResourceRecordSetsCommand,
  HostedZoneId,
  defaultTTL,
) => {
  const { Name, Type, TTL, ResourceRecords } = req.body;
  try {
    const params = {
      HostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: 'CREATE',
            ResourceRecordSet: {
              Name: Name,
              Type: Type,
              TTL: TTL || defaultTTL,
              ResourceRecords: [{ Value: ResourceRecords[0].Value }],
            },
          },
        ],
      },
    };

    const command = new ChangeResourceRecordSetsCommand(params); // Call Route 53 API to create DNS record
    const data = await client.send(command);

    res.status(201).json({ message: 'DNS record created successfully', data });
  } catch (error) {
    console.error('Error creating DNS record:', error);
    res.status(500).json({ error: 'Error creating DNS record' });
  }
};
