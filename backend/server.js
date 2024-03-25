import express from "express";
import app from "./app.js";
import { serverMode, serverPort } from "./config/config.js";


const server = express();
server.use(app);


server.listen(serverPort, () => {
    process.stdout.write(`server is running on ${serverPort} in ${serverMode} Mode \n`)
})

