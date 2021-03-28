const { save, deleteRecord } = require('../dbo');

exports.addUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await save({ email, password });
    console.log(result.id);
    if (!result.err) {
        res.status(201).json({
            id: result.id,
            message: 'New user is created'
        });
    } else {
        res.status(400).json({
            message: result.err
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    const result = await deleteRecord(id);
    if (!result.err) {
        res.status(200).json({
            id: result.id,
            message: 'User is deleted'
        });
    } else {
        res.status(400).json({
            message: result.err
        });
    }
};
