const mongoose = require('mongoose');
const User = require('./model/User.js');

async function startDB() {

    console.log(`mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/smapchat`);
    await mongoose.connect(`mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/smapchat`);

    // Temporary behavior to create dummy user
    const admin = await User.findByEmail("admin@test.com");

    if (admin == null)
    {
        User.createUser("admin@test.com", "admin", process.env.ADMIN_PASS, "");
    }
}

module.exports = startDB;