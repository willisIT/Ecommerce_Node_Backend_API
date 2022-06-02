const products = require("../../../../models/products");

module.exports = async (req, res) => {
    console.log(req.params.productID);
    const item = await products.findById(req.params.productID)
                        .populate(['user', 'category', 'inventory'])
                        .exec();
    console.log(item);
    res.status(200).json({data: item});
}