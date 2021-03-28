const Joi = require("joi");

exports.validateUserId = (req, res, next) => {
    let id = req.params.id.toString() || '';
    console.log(id)

    const schema = Joi.object({
        id: Joi.string().required() 
    }).options({ abortEarly: false })

    const {value, error} = schema.validate({ id });
    if(value && !error) {
        next();
    } else {
        res.status(422).json({ error })
    }
}