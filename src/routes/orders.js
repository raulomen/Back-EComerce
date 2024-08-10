const express = require("express");
const orderSchema = require("../models/order");

const router = express.Router();

//create orden
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         productId:
 *           type: number
 *         quantity:
 *           type: number
 *         totalValue:
 *           type: number
 *       required:
 *         - productId
 *         - quantity
 *         - totalValue
 *       example:
 *         productId: 1
 *         quantity: 5
 *         totalValue: 10000
 */

/**
 * @swagger
 * /api/order:
 *  post:
 *      summary: create new orden
 *      tags: [order]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Order'
 *      responses:
 *          200:
 *              description: new orden created!
 * 
 */

router.post('/order', (req,res)=>{
    const product = orderSchema(req.body);
    product
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
});

//get all order
/** 
 * @swagger
 * /api/order:
 *  get:
 *      summary: return all order
 *      tags: [order]
 *      responses:
 *          200:
 *              description: all order
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                               $ref: '#/components/schemas/Order'
 */
    router.get('/order', (req,res)=>{
        orderSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
});

//get a order
/** 
 * @swagger
 * /api/order/{id}:
 *  get:
 *      summary: return a order
 *      tags: [order]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: the order id
 *      responses:
 *          200:
 *              description: a order
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Order'
 *          404:
 *            description: order no found
 * 
 */
router.get('/order/:id', (req,res)=>{
    const {id} = req.params;
    orderSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});


//put a order
/** 
 * @swagger
 * /api/order/{id}:
 *  put:
 *      summary: update a order
 *      tags: [order]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: the order id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Order'
 *      responses:
 *          200:
 *              description: order updated
 *          404:
 *            description: order no found
 * 
 */
router.put('/order/:id', (req,res)=>{
    const {id} = req.params;
    const {name, value, amount, total} = req.body;
    orderSchema
    .updateOne({_id:id},{ $set: {name,value,amount,total} })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

//delete a order
/** 
 * @swagger
 * /api/order/{id}:
 *  delete:
 *      summary: delete a order
 *      tags: [order]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: the order id
 *      responses:
 *          200:
 *              description: order deleted
 *          404:
 *            description: order no found
 * 
 */
router.delete('/order/:id', (req,res)=>{
    const {id} = req.params;
    orderSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

module.exports = router;