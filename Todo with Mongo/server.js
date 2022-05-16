// aquirng express
const express=require('express');
const mongoose  = require('mongoose');
const app= express();

// acquring database connection 
const db= require("./Config/db").mongodbonline;

// middleware for app
app.use(express.json());
app.use(express.urlencoded({extended:true,useNewUrlParser:true}))

// creating database connection
mongoose.connect(db,({useNewUrlParser:true})).then(m=>
    {
        console.log('Database is Connected')
        // aquring routes here
        app.use("/auth",require("./Routs/auth"))
        // getting server response
        app.get("/",(req,res)=>
        {
            return res.json({message:"Server Is Runinng",success:true}).status(200);
        })
    }).catch(err=>
        {
            console.log(err)
            // return res.json({error:{message:err,errorCode:500},success:false}).status(400)
        })
// defining port 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});