const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.authEncrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

exports.authDecrypt = async (requestPass, userPass) => {
    encrypt = await bcrypt.compare(requestPass, userPass);
    // console.log(encrypt)
    return encrypt
}



exports.token = (userId) => {
    const token = jwt.sign(userId, process.env.TOKEN_SECRET
        //, { expiresIn: process.env.LOGIN_EXP_IN_DAYS }
        // { expiresIn: '1h' }
    );
    return token
}