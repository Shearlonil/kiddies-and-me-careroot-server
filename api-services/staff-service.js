const db = require('../config/db-config');
const bcrypt = require('bcryptjs');

const Staff = db.staff;

const findByEmail = async email => {
    return await Staff.findOne({ 
        where: { email },
    });
};

const updatePassword = async (id, newPass) => {
    // encrypt password
    const hashedPwd = await bcrypt.hash(newPass, 12);
    await Staff.update({ pw: hashedPwd }, {
        where: { id },
        returning: true,
    });
};

// only useful for updating password
const findForPassWord = async id => {
    return await Staff.findByPk(id, {
        attributes: ['pw']
    });
};

module.exports = {
    findByEmail,
    updatePassword,
    findForPassWord,
};