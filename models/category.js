const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 3
    },
    desc: {
        type: String,
        required: true,
        min: 3
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Category", CategorySchema);