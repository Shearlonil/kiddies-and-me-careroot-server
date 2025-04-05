const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middleware/jwt');
const validate = require('../middleware/schemer-validator');
const { schema } = require('../schema/yup-schemas/event-schema');
const eventService = require('../api-services/event-service');

const create = async (req, res) => {
    try {
        await eventService.create(req.body);
        res.sendStatus(200);
    } catch (error) {
        return res.status(400).json({'message': error.message});
    }
};

const upcoming = async (req, res) => {
    res.status(200).json(await eventService.upcoming());
};

const recentEvents = async (req, res) => {
    res.status(200).json(await eventService.recent());
};

router.route('/create').post( verifyAccessToken, validate(schema), create );
router.route('/upcoming').get( upcoming );
router.route('/recent').get( recentEvents );

module.exports = router;