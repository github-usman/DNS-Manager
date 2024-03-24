import mongoose from "mongoose";

const mongodbConnection = ()=>{

    mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName:'dnsmanager',
    })
    .then(()=>console.log("DB is Connected"))
    .catch((e)=>console.log(e));
}


export default mongodbConnection;