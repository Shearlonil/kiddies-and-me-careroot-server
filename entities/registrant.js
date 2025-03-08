module.exports = (sequelize, Sequelize) => {
  
    const Registrant = sequelize.define('Registrant', {
        id:{
            // Sequelize module has INTEGER Data_Type.
            type:Sequelize.BIGINT,
            // To increment user_id automatically.
            autoIncrement:true,
            // user_id can not be null.
            allowNull:false,
            // For uniquely identifying user.
            primaryKey:true
        },
        fname: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        lname: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true,
        },
        no_of_people: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull:false,
            isEmail: true,
            //  email must be unique
            unique: true
        },
        address: {
            type: Sequelize.STRING(350),
            allowNull:false,
            notEmpty: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        province: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        zip: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        locations: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
    }, {
        tableName: 'registrants',
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });  
    return Registrant;
};
