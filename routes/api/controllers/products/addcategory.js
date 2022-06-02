const Category = require("../../../../models/category");

module.exports = async (req, res) => {
    console.log(req.body)
    const category = new Category({
        title: req.body.ctitle,
        desc: req.body.cdesc
    });


    category.save(function(err, cat){
        if(err) return res.json({success: false, err: err});
        res.status(200).json({data: cat});
    })
}