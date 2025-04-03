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

module.exports = {
    findById,
    create,
};