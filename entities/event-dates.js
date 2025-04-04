module.exports = (sequelize, Sequelize) => {
  
    const EventDates = sequelize.define('EventDates', {
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
        date: {
            type: Sequelize.DATEONLY,
            allowNull:false,
            notEmpty: true,
        },
    }, {
        tableName: 'event_dates',
        timestamps: false,
    });  
    return EventDates;
};