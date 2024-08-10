const express = require("express");
const productSchema = require("../models/product");

const router = express.Router();

//create product
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         value:
 *           type: number
 *       required:
 *         - name
 *         - value
 *       example:
 *         name: pc
 *         value: 5000
 */

/**
 * @swagger
 * /api/product:
 *  post:
 *      summary: create new product
 *      tags: [product]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: new product created!
 * 
 */

router.post('/product', (req,res)=>{
    const product = productSchema(req.body);
    product
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
});

//get all product
/** 
 * @swagger
 * /api/product:
 *  get:
 *      summary: return all product
 *      tags: [product]
 *      responses:
 *          200:
 *              description: all products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                               $ref: '#/components/schemas/Product'
 */
    router.get('/product', (req,res)=>{
        productSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
});

//get a product
/** 
 * @swagger
 * /api/product/{id}:
 *  get:
 *      summary: return a product
 *      tags: [product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: the product id
 *      responses:
 *          200:
 *              description: a products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *            description: product no found
 * 
 */
router.get('/product/:id', (req,res)=>{
    const {id} = req.params;
    productSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});


//put a product
/** 
 * @swagger
 * /api/product/{id}:
 *  put:
 *      summary: update a product
 *      tags: [product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: the product id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: products updated
 *          404:
 *            description: product no found
 * 
 */
router.put('/product/:id', (req,res)=>{
    const {id} = req.params;
    const {name, value} = req.body;
    productSchema
    .updateOne({_id:id},{ $set: {name,value} })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

//delete a product
/** 
 * @swagger
 * /api/product/{id}:
 *  delete:
 *      summary: delete a product
 *      tags: [product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: the product id
 *      responses:
 *          200:
 *              description: products deleted
 *          404:
 *            description: product no found
 * 
 */
router.delete('/product/:id', (req,res)=>{
    const {id} = req.params;
    productSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

module.exports = router;