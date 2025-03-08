module.exports = (sequelize, Sequelize) => {
  
    const Staff = sequelize.define('Staff', {
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
        pw: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull:false,
        },
        // title: {
        //     type: Sequelize.STRING,
        //     allowNull:false,
        //     notEmpty: true
        // },
        // uk_status: {
        //     type: Sequelize.STRING,
        //     allowNull:false,
        //     notEmpty: true
        // },
        // visa_details: {
        //     type: Sequelize.STRING(350),
        //     allowNull:false,
        //     notEmpty: true
        // },
        // address: {
        //     type: Sequelize.STRING(350),
        //     allowNull:false,
        //     notEmpty: true,
        // },
        // phone_number: {
        //     type: Sequelize.STRING,
        //     allowNull:false,
        //     notEmpty: true,
        // },
        email: {
            type: Sequelize.STRING,
            allowNull:false,
            isEmail: true,
            //  email must be unique
            unique: true
        },
        // with_dbs: {
        //     type: Sequelize.CHAR(1),
        //     allowNull:false,
        //     notEmpty: true
        // },
        // on_dbs_update: {
        //     type: Sequelize.CHAR(1),
        //     allowNull:false,
        //     notEmpty: true
        // },
        // cv file extension
        // cv_ext: {
        //     type: Sequelize.STRING,
        //     allowNull:true,
        //     notEmpty: false
        // }
    }, {
        tableName: 'staff',
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });  
    return Staff;
};
