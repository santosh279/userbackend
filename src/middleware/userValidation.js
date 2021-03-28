const Joi = require('joi');

exports.userValidation = (req, res, next) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }).with(email, password);

    const { value, error } = schema.validate({ email, password });
    if (value && !error) {
        next();
    } else {
        res.status(422).json({ error });
    }
};
