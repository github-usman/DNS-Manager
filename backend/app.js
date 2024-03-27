import express from 'express';
import bodyParser from 'body-parser';
// import mongodbConnection from "./database/db.js";
import userRouter from './routes/user.route.js';
import dnsRecordsRouter from './routes/dnsRecords.route.js';
import domainRouter from './routes/domains.route.js';
import cors from 'cors';

const app = express.Router();

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/dns-records', dnsRecordsRouter);
app.use('/api/v1/domain', domainRouter);

// mongodbConnection(); // stop for online server

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
