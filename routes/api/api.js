const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport);

//Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/products');
    },
    filename: function(req, file, cb) {
        // const extArr = file.mimetype.split('/');
        // const ext = extArr[extArr.length-1];
        const name = Date.now() + "-"+Math.round(Math.random()*1E9);
        cb(null, name + '-' + file.originalname);
    }
})
const upload = multer({storage: storage});

//Routes
const singinController = require('./controllers/auth/signin');
const singupController = require('./controllers/auth/signup');
const singoutController = require('./controllers/auth/signout');
const confrimUserController = require('./controllers/auth/confirmuser');
const resendLinkController = require('./controllers/auth/resendlink');

const productsController = require('./controllers/products/products');
const addProductsController = require('./controllers/products/addproduct');
const productController = require('./controllers/products/product');
const inventoryController = require('./controllers/products/inventory');
const addCategoryController = require('./controllers/products/addcategory');


//SignUp route
router.post('/signup', singupController);

//Signin route
router.post('/signin', singinController);

//Signout route
router.get('/signout', passport.authenticate('jwt'), singoutController);

//Confrimation of User
router.get("/confirmation/:email/:token", confrimUserController);

//Resend Link
router.post("/resend", resendLinkController);

//Products Endpoints
//Retrieve all products with pagination
router.get('/products', productsController);

//Retrive single product
router.get('/product/:productID', productController);

//Add new Product
router.post('/addproduct',[passport.authenticate('jwt', {session:false}), upload.array('images')],addProductsController);

//Retrive all inventory
router.get('/inventory', inventoryController);

//Create category
router.post('/addcategory', addCategoryController);

module.exports = router;

