module.exports = (sequelize, Sequelize) => {
  
    const Img = sequelize.define('Img', {
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
        name: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        desc: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true
        },
        blur_hash: {
            type: Sequelize.STRING,
            allowNull:false,
            notEmpty: true,
        },
    }, {
        tableName: 'imgs',
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });  
    return Img;
};