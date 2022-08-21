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
