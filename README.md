# ESHOP-Application
Backend of an ESHOP application

1. Initialize the node js project
npm init -y
=> It is an express project using mongodb via mongoose as ODM tool.
=> The node version is v18.4.0

2. Required Dependencies needs to be installed are:
express, mongoose, 

3. We will follow router -> controller -> model form. The complete project will be structured around these three things.
ESHOP comprises Users, Addresses, Products, and Orders model.
Controller will have required logic to process and perform CRUD operations with database.
Routes will comprise the path of uri to go to corresponding controller.

4. First lets set up the server and make connection with Database.
=> First url of mongodb needed to be mentioned
=> further the port number needs to be specified to listen
Both those requirements are flexible and changable, so will put the files in configs folder.

FIRST COMMIT DONE, after connecting with the database.

5. Create the Users model. For id, only _id field will be there, which each document by default have in mongodb.
=> Folders like controllers, middlewares, routes are created.
=> For authentication and authorization logic, middleware is created.
=> controllers for processing like authController, productController, addressController, and orderController etcetera.
=> routes for all the routes and calling corresponding methods from respective controllers to do the required task. The index.js file comprises the routes information.
=> The index.js file needs to be plugged with the server

6. Starting with AuthController, authjwt, authAdmin for signup process, '/users'
=> For signup process, the request should be POST one having all details of the user in request body.

=> The user details will be a JSON, that needs to be converted to js objects, for that we need some kind of parser. 
-> similarly, once the user sign up successfully, the user details needs to be given as response, there JS object need to be converted to json.
-> for this interconversion of json to js and vice-versa, the external middleware body-parser is required.
-> body-parser is added in server.js, a dependency

=> for generating tokens and providing as response headers, jsonwebtoken is required, this dependency should be added
=> The token generation task will be done with the auth.middleware.js
-> token will be given as part of request to authController further.
-> also the _id field of user will be passed.

=> for validating whether the user is admin user or not, adminauth will be added as middleware

=> Files created, auth.jwt.js, auth.admin.js, auth.controller.js, user.model.js etcera.

COMMIT 2 DONE, routes, controllers, models, middlewares created, user model created, dependencies for body-parser, jsonwebtoken added.

7. For signup process
-> the user details need to be verified, so user.validator.js will be there
-> The password value should be saved after encrypting it with bcryptjs, this dependency needs to be added as well.
-> the admin signup is also happening

8. signin process
-> the user details required for login needs to checked
-> the encrpted password needs to checked using bcrypt
-> email should there in users collection, in a document, found using findOne method
-> the token needs to be generated once, email, password are accurate, 
-> for token generation, jwt, a secret key is need, defined in configs folder, auth.config.js
-> once signin done, token is given as response header and user details as response body in json

COMMIT 3 DONE, signup and signin process of user done

