import express from "express";
import router from "./app.js";


const app = express();
const PORT = process.env.PORT || 8080;
const MODE = 'Development';
app.use(router);



app.listen(PORT, () => {
    process.stdout.write(`server is running on ${PORT} in ${MODE} Mode`)
})