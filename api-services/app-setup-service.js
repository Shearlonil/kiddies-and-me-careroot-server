const db = require('../config/db-config');
const bcrypt = require('bcryptjs');

const Staff = db.staff;

const setUp = async () => {
    const fname = "Olajumoke";
    const lname =  "Falanwo";
    const email= "lizzy2010tum@rocketmail.com";
    // encrypt password
    const hashedPwd = await bcrypt.hash('123456', 12);
    await Staff.create({ fname, lname, pw: hashedPwd, email });
};

module.exports = setUp;