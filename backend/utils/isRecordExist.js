import { ListResourceRecordSetsCommand } from '@aws-sdk/client-route-53';
import { HostedZoneId } from '../config/config.js';
import client from '../services/aws-sdk-route53.js';

export const listExistingRecords = async (name, type) => {
  const params = {
    HostedZoneId,
    MaxItems: '1',
    StartRecordName: name,
    StartRecordType: type,
  };
  const command = new ListResourceRecordSetsCommand(params);
  const { ResourceRecordSets } = await client.send(command);
  return ResourceRecordSets.filter(
    (record) => record.Name === name && record.Type === type,
  );
};
