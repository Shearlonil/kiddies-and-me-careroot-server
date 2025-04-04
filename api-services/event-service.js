const db = require('../config/db-config');

const Event = db.event;

const findById = async id => {
    return await Event.findByPk(id, {
        attributes: ['id', 'value', 'mark_done']
    });
};

const create = async jsonData => {
    await Event.create({ value: jsonData, mark_done: false });
};

const recent = async (pageSize) => {
    //  get last five events posted
    return await Event.findAll({
        limit: 5,
        where: { mark_done: 0 },
        order: [ [ 'createdAt', 'DESC' ]]
    }); 
}

module.exports = {
    findById,
    create,
    recent,
};