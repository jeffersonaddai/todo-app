const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string()
        .max(30)
        .required(),
    type: Joi.string()
        .alphanum()
        .max(30)
        .required(),

    date: Joi.string()
        .min(4)
        .max(2200),

    description: Joi.string()
        .max(255)
        .required(),
})


module.exports = {
    validate: function(todo){
        return schema.validate(todo);
    }
}