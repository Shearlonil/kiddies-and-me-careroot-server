module.exports = (sequelize, Sequelize) => {
  
    const Events = sequelize.define('Events', {
        id:{
            // Sequelize module has INTEGER Data_Type.
            type:Sequelize.BIGINT,
            // To increment user_id automatically.
            autoIncrement:true,
            // user_id can not be null.
            allowNull:false,
            // For uniquely identifying staff.
            primaryKey:true
        },
        value: {
            type: Sequelize.JSON,
            allowNull:false,
            notEmpty: true,
        },
        mark_done: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
            notEmpty: true,
        },
    }, {
        tableName: 'events',
        timestamps: true,
    });  
    return Events;
};