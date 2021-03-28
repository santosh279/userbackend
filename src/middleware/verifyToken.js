exports.verifyToken = (req, res, next) => {
    const token = req.get('token');
    if (token) {
        next();
    } else {
        res.status(403).json({
            message: 'Not Allowed'
        });
    }
};