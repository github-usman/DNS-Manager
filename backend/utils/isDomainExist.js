import { ListHostedZonesCommand } from '@aws-sdk/client-route-53';
import client from '../services/aws-sdk-route53.js';

export const isDomainExist = async () => {
  try {
    const command = new ListHostedZonesCommand({});
    const { HostedZones } = await client.send(command);
    return HostedZones;
  } catch (error) {
    console.error('Error listing hosted zones:', error);
    throw error;
  }
};
