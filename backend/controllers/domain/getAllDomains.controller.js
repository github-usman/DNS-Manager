// ---------------GET all Domains or list hosted zones

export const listHostedZones = async (
  req,
  res,
  client,
  ListHostedZonesCommand,
) => {
  try {
    const command = new ListHostedZonesCommand({});
    const { HostedZones } = await client.send(command);
    console.log('list of hosted zones or domains');
    res.status(200).json(HostedZones);
  } catch (error) {
    console.error('Error listing hosted zones:', error);
    throw error; // Rethrow the error for handling at a higher level
  }
};
