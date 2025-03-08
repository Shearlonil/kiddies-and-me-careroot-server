const { Op } = require('sequelize');
const db = require('../config/db-config');

const Registrant = db.registrant;

const findById = async id => {
    return await Registrant.findByPk(id, {
        attributes: ['id', 'fname', 'lname', 'no_of_people', 'email', 'no_attending', 'phone_number', 'city', 'province', 'address', 'locations']
    });
};

const findByEmail = async email => {
    return await Registrant.findOne({ 
        where: { email },
    });
};

const register = async registrant => {
    const { f_name, l_name, no_attending, email, city, phone_no, province, address, zip, locations } = registrant;
    const locationList = locations.join('+');
    return await Registrant.create(
        { fname: f_name, lname: l_name, no_of_people: no_attending, email, city, province, phone_number: phone_no, address,  zip, locations: locationList }
    );
};

const listRegistrants = async ( {idOffset, limit}, pageSpan ) => {
    const where = {
        id: {
            [Op.gt] : idOffset
        }
    };

    const registrants = await Registrant.findAll(
        { 
            where, 
            limit: limit * pageSpan,
        }
    );

    // count jobs if first request and not pagination
    let count = 0;
    if(idOffset === 0) {
        count = await Registrant.count({
            where
        });
    
    }

    return { registrants, count };
};

const deleteRegistrantRecord = async (id) => {
    await db.sequelize.transaction( async (t) => {
        await Registrant.destroy( {
            where: {  id },
            force: true,
        } );
    } );
};

const deleteRegistrantRecordByEmail = async (email) => {
    await db.sequelize.transaction( async (t) => {
        await Registrant.destroy( {
            where: {  id },
            force: true,
        } );
    } );
};

module.exports = {
    findById,
    findByEmail,
    register,
    listRegistrants,
    deleteRegistrantRecord,
    deleteRegistrantRecordByEmail,
};