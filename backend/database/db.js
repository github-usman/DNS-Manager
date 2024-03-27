import mongoose from 'mongoose';
import { dbName, mongoURI } from '../config/config.js';

const mongodbConnection = () => {
  mongoose
    .connect(mongoURI, { dbName })
    .then(() => console.log('DB is Connected Successfully'))
    .catch((e) => console.log(e));
};

export default mongodbConnection;
