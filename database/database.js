const Sequelize = require('sequelize');
const connection = new Sequelize('heroku_03e3a9202585b1f', 'b41a015bd4e70e', '8384b291', {
    host: 'us-cdbr-east-03.cleardb.com',
    dialect: 'mysql'
});

module.exports = connection;