import mongoose, { Mongoose } from 'mongoose';

// dynamic or unknown records
const additionalPropertiesSchema = new mongoose.Schema({}, { strict: false });

// static or known records schema
const resourceRecordSchema = new mongoose.Schema({
  Value: {
    type: String,
    required: true,
  },
});

const schema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  TTL: {
    type: Number,
    required: true,
  },
  ResourceRecords: {
    type: [resourceRecordSchema],
    required: true,
  },
  AdditionalProperties: {
    type: additionalPropertiesSchema,
  },
});

export const DnsRecord = mongoose.model('dnsrecord', schema);
