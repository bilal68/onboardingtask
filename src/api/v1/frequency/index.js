const express = require('express');
const validate = require('express-validation');
const controller = require('./frequency.controller');
const validator = require('./frequency.validator');

const router = express.Router();

/**
 * @api {get} api/v1/users users
 * @apiDescription Test Users API
 * @apiVersion 1.0.0
 * @apiName users
 * @apiPermission public
 *
 * @apiParam  {String} [param]  Put some parameter schema here
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/').get(validate(validator.joiSchema), controller.get);


router.route('/').post(validate(validator.joiSchema), controller.post);

module.exports = router;
