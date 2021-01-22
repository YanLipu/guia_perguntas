const Sequelize = require('sequelize');
const connection = new Sequelize('heroku_03e3a9202585b1f', 'b41a015bd4e70e', '8384b291', {
    host: '127.0.0.1:3306',
    dialect: 'mysql'
});

module.exports = connection;