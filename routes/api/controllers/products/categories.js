const category = require("../../../../models/category");

module.exports = async (req, res) => {
    console.log(req.params.productID);
    const item = await category.findById(req.params.productID)
                        // .populate("products")
                        .exec();
    console.log(item);
    res.status(200).json({data: item});
}