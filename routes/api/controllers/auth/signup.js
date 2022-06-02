const jwt = require('jsonwebtoken');
const User = require('../../../../models/user');
const config = require('../../../../config/database');
const transporter = require('../../../../config/nodemailer')
const Token = require('../../../../models/token');
const crypto = require('crypto');

module.exports = async (req, res)=> {
    console.log("Here POST SignUp");
    console.log("Data: ", req.body.email, " ", req.body.password);
    if(!req.body.email) return res.json({sucess: false, message: "Incomplete credentials..."});
    if(!req.body.password) return res.json({sucess: false, message: "Incomplete credentials..."});
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        // const info = await transporter.sendMail({
        //     from: '"Willis Test" <willisit22@gmail.com>',
        //     to: req.body.email,
        //     subject: "Verify your email",
        //     html: "<b>Hello world</b>"
        // })
        
        // return res.status(200).json({info: info});
        // User.create({
        //     email: req.body.email,
        //     password: req.body.password
        // }, function(err, msg){
        //     if(err) return res.json({message: "Failed..."});
        // });
    
        user.save((err, user)=>{
            if(err) return res.json({success: false, message: "Failed...", err});
            const payload = {email:user.email}
            // const token = jwt.sign(payload, config.secret, {
            //     expiresIn: '24h'
            // })
            const token = new Token({
                userid: user._id,
                token: crypto.randomBytes(16).toString('hex'),

            });

            token.save((err, token)=> {
                // transporter.sendMail({
                //     from: '"Willis Test" <willisit22@gmail.com>',
                //     to: req.body.email,
                //     subject: 'Account Verification Link', 
                //     text: 'Hello '+ user.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n'
                // }, function(err, info){
                //     if(err) {
                //         return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                //     }
                //     return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                // })
                return res.status(200).send('Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n');
            })
        })
    } catch(err) {
        return res.json({success: false, message: err});
    }
    
}
