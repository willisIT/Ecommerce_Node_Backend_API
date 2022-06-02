const Token = require('../../../../models/token');
const transporter = require('../../../../config/nodemailer');
const User = require('../../../../models/user');
const crypto = require('crypto');


module.exports = function(req, res) {
    console.log(req.body.email);
    try {
        User.findOne({ email: req.body.email }, function (err, user) {
            // user is not found into database
            if (!user){
                return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
            }
            // user has been already verified
            else if (user.isVerified){
                return res.status(200).send('This account has been already verified. Please log in.');
            } 
            // send verification link
            else{
                // generate token and save
                const token = new Token({
                    userid: user._id,
                    token: crypto.randomBytes(16).toString('hex'),
                });

                token.save(function (err) {
                    if (err) {
                      return res.status(500).send({msg:err.message});
                    }
        
                    // Send email (use credintials of SendGrid)
                        
                    //     var mailOptions = { from: 'no-reply@example.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
                    //     transporter.sendMail(mailOptions, function (err) {
                    //        if (err) { 
                    //         return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                    //      }
                    //     return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                    // });
                    return res.status(200).send('Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n');
                });
            }
        });
    } catch(e) {
        return res.status(200).send(e.message);
    }
}