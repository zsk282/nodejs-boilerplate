const express = require('express');
const auth = require('../middlewares/auth');
// const validate = require('../middlewares/validate');
// const userValidation = require('../validations/user.validation');
const licenseController = require('../controllers/license.controller');

const router = express.Router();

router.route('/').get(auth('adminReadAccess'), licenseController.getLicenses);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: License
 *   description: Modules license management
 */

/**
 * @swagger
 * /license:
 *   get:
 *     summary: List all modules licenses
 *     description: Only admins can retrieve license details.
 *     tags: [License]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         module_name: name
 *         schema:
 *           type: string
 *         description: Module Name
 *       - in: query
 *         name: module_id
 *         schema:
 *           type: string
 *         description: Module id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of modules
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/License'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
