const db = require('../config/db-config');

const Event = db.event;
const EventDates = db.eventDates;
const sequelize = db.sequelize;

const findById = async id => {
    return await Event.findByPk(id, {
        include: [
            {
                model: EventDates,
            },
        ],
    });
};

const create = async event => {
    try {
        const count = await Event.count({
            where: {
                mark_done: false,
            },
        });
        if (count >= 6) {
            throw new Error("Limit Reached. Max of 6 events allowed. Consider Marking some events as done to add new events");
        }
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

const update = async event => {
    try {
        await sequelize.transaction(async (t) => {
            const { id, title, venue, time, dates } = event;
            const e = await Event.findByPk(id);
            e.title = title;
            e.venue = venue;
            e.time = time;

            await e.save();

            //  delete all previous date entries to pave way for new dates
            await EventDates.destroy({ where: { event_id: id }, transaction: t });
            
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

const markdone = async id => {
    await Event.update({ mark_done: true }, {
        where: {
            id,
        },
    });
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

const upcoming = async (pageSize) => {
    //  get last five events posted
    return await Event.findAll({
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
    update,
    markdone,
    recent,
    upcoming,
};