const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    price: {
        type: Number,
        required: true
    },
    colors: {
        type: String,
        required: true,
        min: 3
    },
    sizes: {
        type: String,
        required: true,
        min: 3
    },
    desc: {
        type: String,
        required: true,
        min: 3
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    inventory: {
        type: Schema.Types.ObjectId,
        ref: "Inventory"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", ProductSchema);