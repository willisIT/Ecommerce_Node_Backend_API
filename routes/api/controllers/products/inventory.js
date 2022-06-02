const inventory = require("../../../../models/inventory");

module.exports = async (req, res) => {
    console.log(req.params.productID);
    try {
        const item = await inventory.find({})
                        .exec();
        console.log(item);
        res.status(200).json({data: item});
    } catch(err) {
        console.log(err);
        res.status(400).json({error: err.message})
    }
}