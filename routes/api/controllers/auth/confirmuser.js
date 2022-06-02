const Token = require('../../../../models/token');
const User = require('../../../../models/user');


module.exports = function(req, res) {
    Token.findOne({ token: req.params.token }, function (err, token) {
        // token is not found into database i.e. token may have expired 
        console.log(token);
        if (!token){
            return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        }
        // if token is found then check valid user 
        else{
            User.findOne({ _id: token.userid, email: req.params.email }, function (err, user) {
                // not valid user
                if (!user){
                    return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
                } 
                // user is already verified
                else if (user.isVerified){
                    return res.status(200).send('User has been already verified. Please Login');
                }
                // verify user
                else{
                    // change isVerified to true
                    user.isVerified = true;
                    user.save(function (err) {
                        // error occur
                        if(err){
                            return res.status(500).send({msg: err.message});
                        }
                        // account successfully verified
                        else{
                          return res.status(200).send('Your account has been successfully verified');
                        }
                    });
                }
            });
        }
        
    });
}