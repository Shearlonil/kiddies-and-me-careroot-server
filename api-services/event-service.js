const db = require('../config/db-config');

const Event = db.event;
const EventDates = db.eventDates;
const sequelize = db.sequelize;

const findById = async id => {
    return await Event.findByPk(id, {
        attributes: ['id', 'value', 'mark_done']
    });
};

const create = async event => {
    try {
        await sequelize.transaction(async (t) => {
            const { title, venue, time, dates } = event;
            const e = await Event.create({ title, venue, time, mark_done: false }, { transaction: t });
            
            //  sequelize transaction not working with forEach loop
            //  https://stackoverflow.com/questions/61369310/sequelize-transactions-inside-foreach-issue
            for (const date of dates) {
                await e.createEventDate({ date }, { transaction: t });
            }
        });
        //  If the execution reaches this line, the transaction has been committed successfully
        //  result` is whatever was returned from the transaction callback (the `user`, in this case)
    } catch (error) {
        //  If the execution reaches this line, an error occurred.
        //  The transaction has already been rolled back automatically by Sequelize!
        throw new Error(error.message); // rethrow the error for front-end 
    }
    // await Event.create({ value: jsonData, mark_done: false });
};

const recent = async (pageSize) => {
    //  get last five events posted
    return await Event.findAll({
        limit: 5,
        where: { mark_done: 0 },
        include: [
            {
                model: EventDates,
            },
        ],
        order: [ [ 'createdAt', 'DESC' ]]
    }); 
}

module.exports = {
    findById,
    create,
    recent,
};