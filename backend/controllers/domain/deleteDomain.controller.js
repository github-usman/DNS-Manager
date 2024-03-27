//  DELETE give domain from hosted zone record

export const deleteHostedZone = async (
  req,
  res,
  isDomainExist,
  client,
  DeleteHostedZoneCommand,
) => {
  try {
    const domainList = req.body;
    const responses = [];

    // Fetch existing hosted zones
    const existingHostedZones = await isDomainExist();

    for (const domain of domainList) {
      const { Name } = domain;
      console.log('Name === from fron or backend', Name);
      const existingZone = existingHostedZones.find(
        (zone) =>
          zone.Name.toLowerCase() == Name + '.'.toLowerCase() ||
          zone.Name.toLowerCase() == Name.toLowerCase(),
      );

      if (!existingZone) {
        console.log(`Hosted zone '${Name}' does not exist. Skipping deletion.`);
        continue;
      }
      const params = {
        Id: existingZone.Id,
      };
      const command = new DeleteHostedZoneCommand(params);

      // Send the command to Route 53
      await client.send(command);
      console.log(`Hosted zone deleted successfully: ${Name}`);
      responses.push({ domain: Name, status: 'Deleted' });
    }

    // Send responses to the client
    res.status(204).json(responses);
    console.log(`Given Hosted zones deleted successfully`);
  } catch (error) {
    console.error('Error deleting hosted zones:', error);
    res.status(500).json({ error: 'Error deleting hosted zones' });
  }
};
