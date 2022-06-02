const bcrypt = require('bcrypt');

const SALTROUNDS = 5;
const salt = bcrypt.genSaltSync(SALTROUNDS);

module.exports = (password) => {
    console.log("Here...")
    return bcrypt.hashSync(password, salt);
}