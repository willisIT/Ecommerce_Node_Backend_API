const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 86400000
        }
    }
});


module.exports = mongoose.model('Token', tokenSchema);