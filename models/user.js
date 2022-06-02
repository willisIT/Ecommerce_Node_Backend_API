const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const hashPassword = require('../helpers/hashPassword');

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true
        }
    },
    hash_password: {
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    produts: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
})

//Virtuals 
UserSchema.virtual('password').set(function(password){this._password = password});

UserSchema.pre('save', function(next){
    const user =this;
    if(user._password === undefined) {
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) console.log(err);
        //hash the password using the new salt
        bcrypt.hash(user._password, salt, function(err, hash){
            if(err) console.log(err);
            user.hash_password = hash;
            next();
        })
    })
})

// UserSchema.pre('save', async (next)=> {
//     console.log("Saving...")
//     // const user = this;
//     // if(this.isModified('password') || this.isNew) {
//     //     await bcrypt.genSaltSync(HASH_SALT, (err, salt)=> {
//     //         if(err) return next(err);
//     //         bcrypt.hash(user.password, salt, null, (err,hash)=>{
//     //             if(err) return next(err);
//     //             user.password = hash;
//     //             console.log("Here....")
//     //             next();
//     //         })
//     //     })
//     // }
//     // if(!this.isModified('password')) return next();
//     // try{
//         // console.log(this.password);
//         // this.password = hashPassword(this.password);
//         // console.log(this.password);
//     // } catch (err) {
//     //     return next(err);
//     // }
        
//     next()
// })

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.hash_password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema);
