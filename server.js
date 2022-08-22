/**
 * This files comprises details of server
 */
const app = require('express')();
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/server.config');
const User = require('./models/user.model')

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const bcrypt = require('bcryptjs');

/**
 * 1. Make connection with the database
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

/**
 * 2. on event, if any error occurs while connecting with the database
*/
db.on('error', () =>{
    console.log('Error while connection to Database');
})

/**
 * 3. Once connection to database becomes successful
 */
 db.once('open', () => {
    console.log('Connected to database');
    init();
})

/**
 * Create admin user
 */
async function init(){
    /**
     * drop the users collection first
     */
    
    await User.collection.drop();
    const adminUser = await User.create({
        email :'admin@upgrad.com',
        password : bcrypt.hashSync('password',8),
        contactNumber : 1111100000,
        role : 'ADMIN'
    })
    console.log(adminUser);
}
/**
 * 5. Plugging the routes
 */
 require('./routes/index')(app);

/**
 * 4. Start the server
 */
app.listen(serverConfig.PORT, () => {
    console.log('Server started on the port no : ',serverConfig.PORT);
})