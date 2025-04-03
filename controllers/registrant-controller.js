const express = require('express');
const router = express.Router();
const { existsSync } = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const nodemailer = require("nodemailer");

const validate = require('../middleware/schemer-validator');
const { verifyAccessToken } = require('../middleware/jwt');
const multerCVUpload = require('../utils/multer-cv-upload');
const registrantService = require('../api-services/registrant-service');
const { schema } = require('../schema/yup-schemas/registration-schema');
const searchSchema = require('../schema/yup-schemas/search-schema');
const { routePositiveNumberMiscParamSchema } = require('../schema/yup-schemas/request-params');

const findAll = async (req, res) => {
    try {
        routePositiveNumberMiscParamSchema.validateSync(req.params.pageSpan);
        res.status(200).json(await registrantService.listRegistrants(req.body, req.params.pageSpan));
    } catch (error) {
        res.status(400).json({'message': error.message});
    }
}

const findById = async (req, res) => {
    try {
        routePositiveNumberMiscParamSchema.validateSync(req.params.id);
        res.status(200).json(await registrantService.findById(req.params.id));
    } catch (error) {
        res.status(400).json({'message': error.message});
    }
}

const deleteRegistrantRecord = async (req, res) => {
    try {
        routePositiveNumberMiscParamSchema.validateSync(req.params.id);
        const cv_ext = await registrantService.deleteRegistrantRecord(req.params.id);
        if(existsSync(path.join(__dirname, "..", "cv-upload", `${req.params.id}${cv_ext}`)) ){
            await fsPromises.unlink(path.join(__dirname, "..", "cv-upload", `${req.params.id}${cv_ext}`));
        }
        res.status(200).json({'message': "OK"});
    } catch (error) {
        res.status(400).json({'message': error.message});
    }
}

const regApplicant = async (req, res) => {
    try {
        const applicantObj = req.body;
        // create account
        await registrantService.register(applicantObj);

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_SERVICE_HOST,
            port: process.env.MAIL_PORT,
            secure: true, // Use true`for port 465, false`for all other ports
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_USER_PASSWORD,
            },
        });
        // Configure the mailoptions object
        const mailOptions = {
            from: process.env.MAIL_AUTH_USER,
            to: process.env.ADMIN_MAIL,
            subject: 'New Registration',
            text: `You have a new registration from ${req.body.f_name}  ${req.body.l_name}`
        };
        
        // Send the email
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                // on error sending mail, delete registration entry created earlier
                await registrantService.deleteRegistrantRecordByEmail(email);
                res.status(500).json({'message': error.response });
            } else {
                res.status(201).json({'message': 'Registration successful'});
            }
        });
    } catch (error) {
        res.status(400).json({'message': error.message});
    }
}

router.route('/delete/:id').put( verifyAccessToken, deleteRegistrantRecord );
router.route('/find/:id').get( verifyAccessToken, findById );
router.route('/onboarding').post(validate(schema), regApplicant );
router.route('/all/:pageSpan').post( verifyAccessToken, validate(searchSchema), findAll );

module.exports = router;
