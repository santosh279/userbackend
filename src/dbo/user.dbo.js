const userModel = require('../models/user.model');
const UserModel = require('../models/user.model');
const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

exports.save = (data) => {
    let new_data = new UserModel(data);
    return new_data
        .save()
        .then((res) => res)
        .catch((err) => err);
};

exports.deleteRecord = (delete_id) => {
    return userModel
        .deleteOne({ _id: new mongodb.ObjectID(delete_id.toString()) })
        .then((res) => res)
        .catch((err) => err);
};
