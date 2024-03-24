import express from "express";
import mongodbConnection from "./database/db.js";
import userRouter from "./rotues/user.route.js";

const app = express.Router();
app.use(userRouter);
mongodbConnection();


app.get('/', (req, res) => {
    res.send('Hello World!');
})




export default app;