const jwt = require('jsonwebtoken');
const User = require('../../../../models/user');
const config = require('../../../../config/database');

module.exports = (req, res)=> {
    try{
        console.log(req.body.email,req.body.password)
        if(!req.body.email || !req.body.password) return res.status(401).json({success: false, message:"Incomplete credentials.."});
        User.findOne({ email: req.body.email }, function(err, user) {
            // error occur
            if(err){
                return res.status(500).send({msg: err.message});
            }
            if(!user) return res.status(401).json({success: false, message:"User not found"});
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch && !err){
                    // check user is verified or not
                    if (!user.isVerified){
                        return res.status(401).send({msg:'Your Email has not been verified. Please click on resend'});
                    } 
                    // user successfully logged in
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: '24h'
                    })
                    return res.status(200).json({
                        user: {
                            id: user.id,
                            email: user.email
                        },
                        access_token : `Bearer ${token}`,
                        expiresIn: '24h'
                    })
                } else {
                    return res.status(401).json({success: false, message:"Authentication failed."});
                }
            });
        });
        
    } catch(err) {
        done(err);
    }
}