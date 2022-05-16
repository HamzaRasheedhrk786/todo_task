const Router  = require("express").Router();
// aquring todo schema model
const {Todo}= require("../../Models")
//aquring todo schema validation
const {addTodo,changeStatus, deleteTodo, updateTodo}= require("../../Validation/todoValidation") 
// getting the response of todo server
Router.get("/",(req,res)=>
{
    return res.json({message:"Todo Server Is Running",success:true}).status(200)
})
// geting todo against Id
Router.get("/single",(req,res)=>
{
    const {_id}=req.query;
    Todo.findOne({_id:_id}).then(singleTodo=>
        {
            if(!singleTodo)
            {
                return res.json({error:{message:"Todo Not Exist Against Id",errorCode:500},success:false}).status(400)
            }
            else
            {
                return res.json({message:"Todo Record Found",todo:singleTodo,success:true}).status(200)
            }
        }).catch(err=>
            {
                return res.json({error:{message:"Catch Error While Getting Todo Against Id",errorCode:500},success:false}).status(400)
            })
})
// getting all todo list
Router.get("/list",(req,res)=>
{
    // getting records
    Todo.find().then(allRecords=>{
        if(allRecords)
        {
            return res.json({message:"All Todo Records",todo:allRecords,success:true}).status(200)
        }
        else
        {
            return res.json({error:{message:"Failed To Find All Todo Records",errorCode:500},success:false}).status(400)
        }
    }).catch(err=>
        {
            return res.json({error:{message:"Catch Error While Getting All Records",errorCode:500},success:false}).status(400)
        })
})
// adding todo api
Router.post("/add",(req,res)=>
{
    // creating object of todo for taking data from body
    const {todo}=req.body;
    addTodo.validateAsync(todo).then(validated=>
        {
            if(validated)
            {
                // passing data in the form of object
                const newTodo=new Todo({
                    name:todo.name,
                    description:todo.description
                })
                // saving object data in database
                newTodo.save().then(todoSaved=>
                    {
                        if(todoSaved)
                        {
                            return res.json({message:"Todo Record Saved Successfully",todo:todoSaved,success:true}).status(200)
                        }
                        else
                        {
                            return res.json({error:{message:"Failed To Save Todo Record",errorCode:500},success:true}).status(400)
                        }
                    }).catch(err=>
                        {
                            return res.json({error:{message:"Catch Error While Saving User Data",errorCode:500},success:false}).status(400)
                        })
            }
        }).catch(err=>
            {
                if(err.isJoi===true){
                    return res.json({error:{message:err.message, errorCode:500}, success:false});
                }
                else{
                    return res.json({error:{message:"Catch Error, While Validating Todo Data", errorCode:5000}, success:false}).status(500);
                }
            })
})
// changing the status of todo
Router.patch("/updateStatus",(req,res)=>
    {
        const {todo}= req.body;
        changeStatus.validateAsync(todo).then(validated=>
            {
                if(validated)
                {
                  Todo.findOne({_id:todo._id}).then(found=>
                    {
                        if(!found)
                        {
                            return res.json({error:{message:"Todo Not Exists Against Id",errorCode:500},success:false}).status(400);
                        }
                        else
                        {
                            Todo.updateOne({_id:todo._id},{$set:{"status":todo.status}}).then(updateStatus=>
                                {
                                    if(updateStatus)
                                    {
                                        Todo.findOne({_id:todo._id}).then(updated=>
                                            {    
                                                if(!updated)
                                                {
                                                    return res.json({error:{message:"Updated Todo Status Record Not Found",errorCode:500},success:false}).status(400)
                                                }
                                                else
                                                {

                                                    return res.json({message:"Todo Status Updated",todo:updated,success:true}).status(200)
                                                }
                                            }).catch(err=>
                                                {
                                                    return res.json({error:{message:"Catch Error While Updation Status",errorCode:500},success:false}).status(400)
                                                })
                                    }
                                    else
                                    {
                                        return res.json({error:{message:"Failed Status Updation",errorCode:500},success:false}).status(400)
                                    }
                                }).catch(err=>
                                    {
                                        return res.json({error:{message:err,errorCode:500},success:false}).status(400)
                                    })
                        }
                    }).catch(err=>
                        {
                            return res.json({error:{message:err,errorCode:500},success:false}).status(400)
                        })  
                }
                else
                {
                    return res.json({error:{message:"Data validation Error",errorCode:500},success:false}).status(400);
                }

            }).catch(err=>
            {
                if(err.isJoi===true){
                    return res.json({error:{message:err.message, errorCode:500}, success:false});
                }
                else{
                    return res.json({error:{message:"Catch Error, While Validating Todo Data", errorCode:5000}, success:false}).status(500);
                }
            })

    })
// Update Todo api
Router.put("/update",(req,res)=>
{
    const{todo}=req.body;
    updateTodo.validateAsync(todo).then(validated=>
        {
            if(validated)
            {
                Todo.findOne({_id:todo._id}).then(found=>
                    {
                        if(!found)
                        {
                            return res.json({error:{message:"Todo Not Exists Against Id",errorCode:500},success:false}).status(400)
                        }
                        else
                        {
                            Todo.updateMany({_id:todo._id},{$set:{"name":todo.name,"description":todo.description}}).then(updated=>
                                {
                                    if(updated)
                                    {
                                        Todo.findOne({_id:todo._id}).then(updated=>
                                            {    
                                                if(!updated)
                                                {
                                                    return res.json({error:{message:"Updated Todo Record Not Found",errorCode:500},success:false}).status(400)
                                                }
                                                else
                                                {

                                                    return res.json({message:"Todo Record Updated",todo:updated,success:true}).status(200)
                                                }
                                            }).catch(err=>
                                                {
                                                    return res.json({error:{message:"Catch Error While Updation Todo",errorCode:500},success:false}).status(400)
                                                })

                                    }
                                    else
                                    {
                                        return res.json({error:{message:"Failed Todo Updation",errorCode:500},success:false}).status(400)
                                    }
                                }).catch(err=>
                                    {
                                        return res.json({error:{message:"Catch Error While Updation Todo",errorCode:500},success:false}).status(400)
                                    })
                        }
                    }).catch(err=>
                        {
                            return res.json({error:{message:"Catch Error Whihle Finding Todo Against Id",errorCode:500},success:false}).status(400)
                        })
            }
            else
            {
                return res.json({error:{message:"Data Validation Error",errorCode:500},success:false}).status(400)
            }
        }).catch(err=>
            {
                if(err.isJoi===true){
                    return res.json({error:{message:err.message, errorCode:500}, success:false});
                }
                else{
                    return res.json({error:{message:"Catch Error, While Validating Todo Data", errorCode:5000}, success:false}).status(500);
                }
            })
})

// Deleting Todo Record
Router.delete("/delete",(req,res)=>
{
    const {todo}=req.body;
    deleteTodo.validateAsync(todo).then(validated=>
        {
            if(validated)
            {
                Todo.findOne({_id:todo._id}).then(todoFind=>
                    {
                        if(!todoFind)
                        {
                            return res.json({error:{message:"Todo Not Exists Against Id",errorCode:500},success:false}).status(400)
                        }
                        else
                        {
                            Todo.findOneAndRemove({_id:todo._id}).then(todoRemoved=>
                                {
                                    if(!todoRemoved)
                                    {
                                        return res.json({error:{message:"Failed To Remove Todo Against Id",errorCode:500},success:fasle}).status(400)
                                    }
                                    else
                                    {
                                        return res.json({message:"Todo Deleted Against Id",todo:todoRemoved,success:true}).status(200)
                                    }
                                }).catch(err=>
                                    {
                                        return res.json({error:{message:"Catch Error While Removing Todo",errorCode:500},success:false}).status(400)
                                    })
                        }
                    }).catch(err=>
                        {
                            return res.json({error:{message:"Catch Error While Finding Todo Against Id",errorCode:500},success:false}).status(400)
                        })
            }
            else
            {
                return res.json({error:{message:"Validation Failed",errorCode:500},success:false}).status(400)
            }

        }).catch(err=>
            {
                if(err.isJoi===true){
                    return res.json({error:{message:err.message, errorCode:500}, success:false});
                }
                else{
                    return res.json({error:{message:"Catch Error, While Validating Id", errorCode:5000}, success:false}).status(500);
                }
            })
})
// all pending todo records
Router.get("/pending",(req,res)=>
{
    Todo.find({"status":"pending"}).then(allRecord=>{
        if(!allRecord)
        {
            return res.json({error:{message:"Failed To Get Pending Todo List",errorCode:500},success:false}).status(400)
        }
        else
        {
            return res.json({message:"All Pending Todo List Records",todo:allRecord,success:true}).status(200)
        }
    }).catch(err=>
        {
            return res.json({error:{message:"Catch Error While Finding Pending Todo List",errorCode:500},success:false}).status(400)
        })
})
// all active record
Router.get("/active",(req,res)=>
{
    Todo.find({"status":"active"}).then(allRecord=>{
        if(!allRecord)
        {
            return res.json({error:{message:"Failed To Get Active Todo List",errorCode:500},success:false}).status(400)
        }
        else
        {
            return res.json({message:"All Active Todo List Records",todo:allRecord,success:true}).status(200)
        }
    }).catch(err=>
        {
            return res.json({error:{message:"Catch Error While Finding Active Todo List",errorCode:500},success:false}).status(400)
        })
})
module.exports=Router;