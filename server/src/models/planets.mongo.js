const mongoose = require('mongoose');

const planetSchema = new mongoose.Scheme({
    keplerName: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('Planet', planetSchema);