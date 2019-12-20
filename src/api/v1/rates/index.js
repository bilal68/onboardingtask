const express = require('express');
const validate = require('express-validation');
const controller = require('./rates.controller');
const validator = require('./rates.validator');

const router = express.Router();

/**
 * @api {get} api/v1/rates/latest
 * @apiDescription API to fetch latest rate
 * @apiVersion 1.0.0
 * @apiName rates/latest
 * @apiPermission public
 *
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError
 */
router.route('/latest').get(validate(validator.joiSchema), controller.latest);


/**
 * @api {get} api/v1/rates
 * @apiDescription API to fetch latest rate
 * @apiVersion 1.0.0
 * @apiName rates/latest
 * @apiPermission public
 *
 * @apiParam  {date-time} [from, to] 
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError Some parameters may contain invalid values
 */
router.route('/').get(validate(validator.joiSchema), controller.list);

module.exports = router;
