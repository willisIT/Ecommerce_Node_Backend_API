const Product = require("../../../../models/products");
const Inventory = require('../../../../models/inventory');
const Category = require('../../../../models/category');
const User = require("../../../../models/user");

module.exports = async function(req, res){
    console.log(req.body);
    console.log(req.user._id)
     try {
        const category = await Category.findOne({title: req.body.ctitle});

        if(category == null) {
            throw new Error('Category not found.')
        }

        const inventory = new Inventory({
            quantity: req.body.iquantity
        });

        const savedInventory = await inventory.save();

        // const user = User.findById(req.user._id);
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            colors: req.body.colors,
            sizes: req.body.sizes,
            desc: req.body.desc,
            user: req.user._id,
            category: category._id,
            inventory: savedInventory._id
        });
        const savedProduct = await product.save();
        const update = await Category.findOneAndUpdate({title: req.body.ctitle}, {
            $push: {products: savedProduct._id}
        })
        console.log("Update: ", update);
        // await category.save();

        res.status(200).json({success: true, msg: savedProduct});
    } catch(err) {
        console.log(err);
        res.status(403).json({success: false, error: err.message})
    }
    
}