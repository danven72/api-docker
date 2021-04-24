const Joi = require('joi');
//This library validate Mongo IDs
const JoiOid = require('joi-oid');

function AppleValidator() {

    this.validateInputAppleForAdd =  function(apple) {
        const schema = Joi.object({ 
            name: Joi.string() .min(2) .required(),
            color: Joi.string() .min(2) .required() 
        });        
        return schema.validate(apple);
    }

    this.validateInputMongoId = function(mongoId) {
        return doIdValidation(mongoId);
    }

    function doIdValidation(mongoId) {
        const schema = JoiOid.object({
            id: JoiOid.objectId(),
            name: JoiOid.string(),
            age: JoiOid.number().min(18),
          });
          return schema.validate(mongoId);

    }

   this. validateInputAppleForUpdate =  function(mongoid, apple) {
        const idValidationResult = doIdValidation(mongoid);
        if (idValidationResult.error) {
            return idValidationResult;
        }
        else {
            const schema = Joi.object({ 
                name: Joi.string() .min(2) ,
                color: Joi.string() .min(2) 
            }).min(1);  // at least 1 values required in input (id always required and min ine field to Update)       
            return schema.validate(apple);
        }
    }

    this.validateInputParamsForDelete =  function(params) {
        const schema = Joi.object({ 
            id: Joi.number().min(1).required()
        });
        return schema.validate(params);
    }
}

module.exports = AppleValidator;