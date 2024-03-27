import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

// AWS SDK
const awsKey = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  HostedZoneId: process.env.HOSTED_ZONE_ID,
  defaultTTL: process.env.DEFAULT_TTL,
};

// DB connection
const mongoDB = {
  mongoURI: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
};

// server port and mode
const server = {
  serverPort: process.env.SERVER_PORT,
  serverMode: process.env.SERVER_MODE,
};

// Exporting the variables
export const { accessKeyId, secretAccessKey, HostedZoneId, defaultTTL } =
  awsKey;
export const { mongoURI, dbName } = mongoDB;
export const { serverMode, serverPort } = server;
