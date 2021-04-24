const Joi = require('joi');

function AppleValidator() {

    this.validateInputAppleForAdd =  function(apple) {
        const schema = Joi.object({ 
            name: Joi.string() .min(2) .required(),
            color: Joi.string() .min(2) .required() 
        });        
        return schema.validate(apple);
    }

   this. validateInputAppleForUpdate =  function(apple) {
        const schema = Joi.object({ 
            id: Joi.number().min(1).required(),
            name: Joi.string() .min(2) ,
            color: Joi.string() .min(2) 
        }).min(2);  // at least 2 values required in input (id always required and min ine field to Update)       
        return schema.validate(apple);
    }

    this.validateInputParamsForDelete =  function(params) {
        const schema = Joi.object({ 
            id: Joi.number().min(1).required()
        });
        return schema.validate(params);
    }
}

module.exports = AppleValidator;