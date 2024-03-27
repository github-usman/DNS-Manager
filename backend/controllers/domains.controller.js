import {
  DeleteHostedZoneCommand,
  ListHostedZonesCommand,
  CreateHostedZoneCommand,
} from '@aws-sdk/client-route-53';
import client from '../services/aws-sdk-route53.js';
import { listHostedZones } from './domain/getAllDomains.controller.js';
import { isDomainExist } from '../utils/isDomainExist.js';
import { createHostedZone } from './domain/createDomain.controller.js';
import { deleteHostedZone } from './domain/deleteDomain.controller.js';

// GET all Domains or list hosted zones

export const listHostedZonesHandler = async (req, res) => {
  try {
    await listHostedZones(req, res, client, ListHostedZonesCommand);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error retrieving Domains' });
  }
};

//  create a hosted zones or Domains

export const createHostedZoneHandler = async (req, res) => {
  try {
    const result = await createHostedZone(
      req,
      res,
      isDomainExist,
      client,
      CreateHostedZoneCommand,
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error creating Domains' });
  }
};

//  DELETE give domain from hosted zone record
export const deleteHostedZoneHandler = async (req, res) => {
  try {
    await deleteHostedZone(
      req,
      res,
      isDomainExist,
      client,
      DeleteHostedZoneCommand,
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error deleting Domains' });
  }
};
