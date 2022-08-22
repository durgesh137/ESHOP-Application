/**
 * This file comprises details related to products
 */

const Product = require('../models/product.model');

/** 
 * 1. This function searches the product in Product collection *
*/
const searchProduct = async(req, res) => {
    try{
        /**
         * extract all query parameters from request
         */         
         let category, name, sortBy, direction;
         name = req.query.name != undefined ? req.query.name : '';
         category = req.query.category != undefined ? req.query.category : '';
         sortBy = req.query.sortBy != undefined ? req.query.sortBy : 'productId';
         direction = req.query.direction != undefined ? req.query.direction : 'desc';
 
         /**
          * validate the direction is ASC or DESC only
          */
         if(direction == 'ASC' || direction == 'DESC'){
             direction = direction.tolowerCase();
         }else{
             //default value
             direction = 'desc'
         }
 
         /**
          * Fetch all products from Product model as per specified filters in sorted order
          */
         const products = await Product.find({
             name : name,
             category : category            
         }).sort({sortBy : direction});
 
 
         /**
          * prepare the post reponse 
          */
         const postResponse = {
             content : products
         }
 
         //send product response now
         return res.status(200).send(postResponse);
     }catch(err){
         return res.status(404).send([]);
     }
 }


/**
 * 2. method to provide all product categories
 */
 const productCategories = async (req, res) => {
    try{
        /**
         * 1. fetch all products from Product model
         */
        const allProducts = await Product.find({});  
        const allCategories = [];
        if(allProducts){
            //append each category in categories array
            allProducts.forEach((product) => {
                allCategories.push(product.category)
            })

            //find unique categories from allCategories array
            const uniqueOnes = [... new Set(allCategories)];
            //categories in ascending order returned
            return res.status(200).send(uniqueOnes.sort())
        }
        
        //empty array returned
        return res.status(200).send(allCategories);
        
    }catch(err){
        return res.status(404).send([])
    }
}

/**
 * 3 Method to fetch the product by id
*/
const getProductById = async(req, res) => {
    try{
        /**
         * 1. extract id from request
         */

        const id = req.params.productId;

        /**
         * 2. fetch product for that id
         */
        const searchedProduct = await Product.findOne({_id : id});
        if(!searchedProduct){
            return res.status(404).send('No Product found for ID - ',id);
        }

        return res.status(200).send(searchedProduct);
    }catch(err){
        const message  = 'No Product found for ID - '+req.path.productId
        return res.status(404).send(message);   
    }
}
 

/**
 * 4. This function saves the product in Product collection
*/
const addProduct = async(req, res) => {

    try{
        /**
         * 1. read product details from request
         */
         const productObj = {
            name : req.body.name,
            availableItems : req.body.availableItems,
            price : req.body.price,
            category : req.body.category,
            description : req.body.description,
            manufacturer : req.body.manufacturer,
            imageUrl : req.body.imageUrl
        }

        /**
         * 2. save product details in Product model
        */
        const savedProduct = await Product.create(productObj);

        /**
         * 3. Prepare the post response
         */
        const postResponse = {
            productId : savedProduct._id,
            name : savedProduct.name,
            category : savedProduct.category,
            price : savedProduct.price,
            description : savedProduct.description,
            manufacturer : savedProduct.manufacturer,
            availableItems : savedProduct.availableItems,
            imageUrl : savedProduct.imageUrl,
            createdAt : savedProduct.createdAt,
            updatedAt : savedProduct.updatedAt
        }

        /**
         * 4. send success response back
         */
        res.status(200).send(postResponse);

    }catch(err){
        return res.status(500).send({
            message : 'Internal server error while saving Product'
        });
    }
}

/**
 * 5. update the product based on specified ID in request
*/
const updateProductById = async(req, res) => {
    try{
        /**
         * fetch Product based on specified id, if it exists
         */
        const product = await Product.findOne({_d : req.params.productId});

        //check if valid product
        if(!product){
            return res.status(404).send({
                message : "No Product found for ID - "+req.params.productId
            })
        }
        
        /**
         * updating fields based on request
         */
        product.name = req.body.name != undefined ? req.body.name : product.name;
        
        product.category = req.body.category != undefined ? req.body.category : product.category;
        
        product.price = req.body.price != undefined ? req.body.price : product.price;
        
        product.description = req.body.description != undefined ? req.body.description : product.description;

        product.manufacturer = req.body.manufacturer != undefined ? req.body.manufacturer : product.manufacturer;
        
        product.availableItems = req.body.availableItems != undefined ? req.body.availableItems : product.availableItems;

        product.imageUrl = req.body.imageUrl != undefined ? req.body.imageUrl : product.imageUrl;
        
        product.updatedAt = req.body.updatedAt != undefined ? req.body.updatedAt : product.updatedAt;

        product.createdAt = req.body.createdAt != undefined ? req.body.createdAt : product.createdAt;

        /**
         * save product object
         */
        const updatedProduct = await product.save();

        /**
         * prepare the response object
         */
        const postResponse = {
            productId : updatedProduct._id,
            name : updatedProduct.name,
            category : updatedProduct.category,
            price : updatedProduct.price,
            description : updatedProduct.description,
            manufacturer : updatedProduct.manufacturer,
            availableItems : updatedProduct.availableItems,
            imageUrl : updatedProduct.imageUrl,
            createdAt : updatedProduct.createdAt,
            updatedAt : updatedProduct.updatedAt
        }

        /**
         * send the success response
         */
        res.status(200).send(postResponse);

    }catch(err){

    }
}

/**
 * 6. deleted product based on product id in request
 */
const deleteProductById = async (req, res) => {
    try{
        /**
         * read productId from request parameter
         */
        const productId = req.params.productId;

        /**
         * fetch product based on specified productId
         */
        const product = await Product.findOne({_id : productId});

        /**
         * product does not exist
         */
        if(!product){
            return res.status(404).send({
                message : 'No Product found for ID - '+productId
            })
        }

        /**
         * delete the product from products collections
         */
        const deletedUser = await product.deleteOne({_id : productId});

        return res.status(200).send({
            message : 'Product with Id - '+productId+' deleted successfully!'
        })

    }catch(err){
        return res.status(404).send({
            message : 'Error in deleting product  having ID - '+req.params.productId
        });
    }
}

module.exports = {
    searchProduct : searchProduct,
    addProduct : addProduct,
    productCategories : productCategories,
    getProductById : getProductById,
    updateProductById : updateProductById,
    deleteProductById : deleteProductById
}