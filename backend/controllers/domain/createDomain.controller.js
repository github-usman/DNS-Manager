// ---------------CREATE group of domain record ( bulk data)

export const createHostedZone = async (
  req,
  res,
  isDomainExist,
  client,
  CreateHostedZoneCommand,
) => {
  try {
    const domainList = req.body;
    const existingHostedZones = await isDomainExist();
    console.log(existingHostedZones, 'existing zones ');
    const responses = []; //for final log
    for (const domain of domainList) {
      const { Name, PrivateZone, Comment } = domain;
      // Check if the domain already exists
      // console.log(existingHostedZones,' ==== ',Name)
      if (
        existingHostedZones.find(
          (zone) =>
            zone.Name.toLowerCase() == (Name + '.').toLowerCase() ||
            zone.Name.toLowerCase() == Name.toLowerCase(),
        )
      ) {
        console.log(`Hosted zone '${Name}' already exists. Skipping creation.`);
        continue;
      }
      const params = {
        Name: Name, // Domain name
        CallerReference: `usman-${Date.now()}`,
        HostedZoneConfig: {
          Comment: Comment || ' ',
          PrivateZone: PrivateZone || false,
        },
      };

      const command = new CreateHostedZoneCommand(params);
      const { HostedZone } = await client.send(command);
      // console.log(`Hosted zone created successfully: ${HostedZone.Name}`);
      responses.push(HostedZone.Name);
    }

    // Send responses to the client
    res.status(201).json(responses);

    console.log(
      responses.length === 0
        ? 'No domain is created because all are already exist'
        : `these Hosted zones created successfully ${responses}`,
    );
  } catch (error) {
    console.error('Error creating hosted zones:', error);
    res.status(500).json({ error: 'Error creating hosted zones' });
  }
};
