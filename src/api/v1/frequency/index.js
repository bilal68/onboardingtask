const express = require('express');
const validate = require('express-validation');
const controller = require('./frequency.controller');
const { get, post } = require('./frequency.validator');

const router = express.Router();

/**
 * @api {get} api/v1/frequency 
 * @apiDescription  API to fetch Frequency
 * @apiVersion 1.0.0
 * @apiName frequency
 * @apiPermission public
 *
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)
 */
router.route('/').get(validate(get.joiSchema), controller.get);

/**
 * @api {post} api/v1/frequency
 * @apiDescription  API to fetch Frequency
 * @apiVersion 1.0.0
 * @apiName frequency
 * @apiPermission public
 *
 * @apiParam  {Int} [minutes]  Put some parameter schema here
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/').post(validate(post.joiSchema), controller.post);

module.exports = router;
