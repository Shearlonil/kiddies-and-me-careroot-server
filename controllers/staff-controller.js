const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { routePasswordParamSchema } = require('../yup-schemas/request-params');
const staffService = require('../api-services/staff-service');
const { verifyAccessToken } = require('../middleware/jwt');

const updatePassword = async (req, res) => {
    try {
        const current_pw = req.body.current_pw;
        const new_pw = req.body.new_pw;
        // First thing First: validate current and new passwords in request body
        routePasswordParamSchema.validateSync(current_pw);
        routePasswordParamSchema.validateSync(new_pw);
        // find staff from db using id in request parameter
        const staff = await staffService.findForPassWord(req.whom.id);
        if(!staff) {
            return res.status(400).json({'message': "Profile not Found"});
        }
        // check if current password is correct
        // if match, then compare password
        const match = await bcrypt.compare(current_pw, staff.pw);
        if(match) {
            await staffService.updatePassword(req.whom.id, new_pw);
            res.status(200).json({'message': 'Password update successful'});
        }else {
            res.status(401).json({'message': 'Invalid password'});
        }
    } catch (error) {
        return res.status(400).json({'message': error.message});
    }
};

router.route('/update-pw').put( verifyAccessToken, updatePassword );

module.exports = router;