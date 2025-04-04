const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middleware/jwt');
const eventService = require('../api-services/event-service');
const quillSchema = require('../schema/json-schema/quill-schema');

const Ajv =  require("ajv");
const ajv = new Ajv({allErrors: true});

const create = async (req, res) => {
    try {
        const isValid = ajv.validate(quillSchema, req.body);
        if (!isValid) {
            throw new Error("Invalid format detected");
        }
        await eventService.create(req.body);
        res.sendStatus(200);
    } catch (error) {
        return res.status(400).json({'message': error.message});
    }
};

const recentEvents = async (req, res) => {
    res.status(200).json(await eventService.recent());
};

router.route('/create').post( verifyAccessToken, create );
router.route('/recent').get( recentEvents );

module.exports = router;