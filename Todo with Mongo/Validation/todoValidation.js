// input validation through joi
const Joi= require('joi');
const {ref} = require('joi')
// todo schema 
const addTodo= Joi.object({
    name: Joi.string().pattern(new RegExp(/[a-zA-Z]+/)).label("name").required().messages({
        "any.required": "Todo Name Required",
        "string.empty": "Todo Name Can't Be Empty",
        'string.pattern.base': '{#label} must be in alphabets',
    }),
    description:Joi.string().pattern(new RegExp(/[a-zA-Z]+/)).label("description").required().messages({
        "any.required": "Todo Descripion Required",
        "string.empty": "Todo Description Can't Be Empty",
        'string.pattern.base': '{#label} must be in alphabets',
    })
}).required().messages({
    "any.required":"Invalid Todo Data"
})
// change status of todo
const changeStatus= Joi.object({
    _id: Joi.string().required().messages({
        "any.required": "Todo Id Required",
        "string.empty": "Todo Id Can't Be Empty",
        
    }),
    status:Joi.string().pattern(new RegExp(/[a-zA-Z]+/)).label("status").required().messages({
        "any.required": "Todo status Required",
        "string.empty": "Todo Status Can't Be Empty",
        'string.pattern.base': '{#label} must be in alphabets',
    })
}).required().messages({
    "any.required":"Invalid Todo Data"
})
// updating todo name description
const updateTodo= Joi.object({
    _id: Joi.string().required().messages({
        "any.required": "Todo Id Required",
        "string.empty": "Todo Id Can't Be Empty",
    }),
    name: Joi.string().pattern(new RegExp(/[a-zA-Z]+/)).label("name").required().messages({
        "any.required": "Todo Name Required",
        "string.empty": "Todo Name Can't Be Empty",
        'string.pattern.base': '{#label} must be in alphabets',
    }),
    description:Joi.string().pattern(new RegExp(/[a-zA-Z]+/)).label("description").required().messages({
        "any.required": "Todo Descripion Required",
        "string.empty": "Todo Description Can't Be Empty",
        'string.pattern.base': '{#label} must be in alphabets',
    })
}).required().messages({
    "any.required":"Invalid Todo Data"
})
// delete todo
const deleteTodo= Joi.object({
    _id: Joi.string().required().messages({
        "any.required": "Todo Id Required",
        "string.empty": "Todo Id Can't Be Empty",
        
    }),
    
}).required().messages({
    "any.required":"Invalid Todo Data"
})  
module.exports={
    addTodo,
    changeStatus,
    updateTodo,
    deleteTodo
}