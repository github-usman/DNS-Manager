import { Route53Client } from '@aws-sdk/client-route-53';
import { accessKeyId, secretAccessKey } from '../config/config.js';

const client = new Route53Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});
export default client;
