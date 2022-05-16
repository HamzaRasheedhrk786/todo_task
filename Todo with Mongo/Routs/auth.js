const Router= require('express').Router();

// defining routes || middleware

Router.use("/todo",require("../API/Todo/auth"))

// user routs
Router.use("/user",require("../API/User/auth")) 

module.exports=Router;