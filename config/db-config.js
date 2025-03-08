const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('careroot', 'bora', 'Action@1837', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

const sequelize = new Sequelize('rootlntg_kiddies_and_me_careroot_cic', 'rootlntg_kiddies_and_me', 'uo(PY!JQh@YS', {
    host: 'localhost',
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.imgs = require('../entities/img')(sequelize, Sequelize);
db.registrant = require('../entities/registrant')(sequelize, Sequelize);
db.staff = require('../entities/staff')(sequelize, Sequelize);

db.connect = async () => {
    try {
        await sequelize.authenticate();
        /*  This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), 
            and then performs the necessary changes in the table to make it match the model.
        */
        // await sequelize.sync( { alter: true } );
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = db;