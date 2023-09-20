
    // Db connection
    require("dotenv").config();
    const mongoose = require("mongoose");
     mongoose.connect(process.env.Mongo_Url).then((data)=>{
         console.log("Mongoose connected to database");
     }).catch((error)=>{
          console.log("Mongoose connection failed!",error)
     })
           

