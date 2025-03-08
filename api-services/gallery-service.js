const db = require('../config/db-config');

const Img = db.imgs;

const upload = async (encodedHash, file) => {
    await Img.create({ name: file, desc: "_", blur_hash: encodedHash.hash });
}

const getAll = async () => {
    return await Img.findAll({
        order: [
            ['id', 'DESC'],
        ]
    });
}

const deleteImg = async (id) => {
    const img = await Img.findByPk(id, {
        attributes: ['name']
    });
    await db.sequelize.transaction( async (t) => {
        await Img.destroy( {
            where: {  id },
            force: true,
        } );
    } );
    return img.name
}

module.exports = {
    upload,
    getAll,
    deleteImg,
};