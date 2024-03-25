import express from "express";
import bodyParser from "body-parser";
import mongodbConnection from "./database/db.js";
import userRouter from "./routes/user.route.js";
import dnsRecordsRouter from "./routes/dnsRecords.route.js";

const app = express.Router();

// parse application/json
app.use(bodyParser.json());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/dns-records",dnsRecordsRouter);
mongodbConnection();


app.get('/', (req, res) => {
    res.send('Hello World!');
})




export default app;