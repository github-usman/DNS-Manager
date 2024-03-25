import express from "express";
import bodyParser from "body-parser";
import mongodbConnection from "./database/db.js";
import userRouter from "./rotues/user.route.js";

const app = express.Router();

// parse application/json
app.use(bodyParser.json());
app.use("/api/v1/users",userRouter);
mongodbConnection();


app.get('/', (req, res) => {
    res.send('Hello World!');
})




export default app;