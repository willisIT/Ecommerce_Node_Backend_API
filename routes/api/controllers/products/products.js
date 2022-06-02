const Product = require("../../../../models/products");

module.exports = async function(req, res){
    const number_of_items = 10;
    const page= req.page;
    try{
        const products = await Product.find({})
                            .populate(["user", "category", "inventory"],)
                            .skip(((page-1)*number_of_items))
                            .limit(number_of_items)
                            .exec();
        res.status(200).json({success: true, products: products})
    } catch(err) {
        console.error(err)
        res.status(401).json({success: false, error: err.message})
    }
    
}