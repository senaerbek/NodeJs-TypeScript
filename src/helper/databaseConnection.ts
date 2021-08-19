const mongoose = require('mongoose');

const connectionDatabase = () => {
    mongoose.connect("", {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
        .then(() => {
            console.log('connected');
        })
        .catch((err: Error) => {
            console.log('err', err)
        })
}

module.exports = connectionDatabase;
