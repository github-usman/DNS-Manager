import express from "express";
import app from "./app.js";


const server = express();
const PORT = process.env.PORT || 8080;
const MODE = 'Development';
server.use(app);



server.listen(PORT, () => {
    process.stdout.write(`server is running on ${PORT} in ${MODE} Mode \n`)

})