module.exports = (sequelize, Sequelize) => {
  
    const Parent = sequelize.define('Parent', {
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
        requested_service: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        address: {
            type: Sequelize.STRING(350),
            allowNull:false,
            notEmpty: true,
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull:false,
            isEmail: true,
            //  email must be unique
            unique: true
        },
        // cv file extension
        further_family_notes: {
            type: Sequelize.STRING(350),
            allowNull:true,
            notEmpty: false
        },
    }, {
        tableName: 'parents',
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });  
    return Parent;
};
