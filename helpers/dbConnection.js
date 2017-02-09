/**
 * Helper for handling mySql and Sequelize database connection
 *
 * @class dbConnection
 */


/**
 * Requiring mysql npm
 * @property mysql
 * @type file
 */
var mysql = require('mysql');
/**
 * Requiring sequelize npm
 * @property sequelize
 * @type file
 */
var sequelize = require('sequelize');

/**
 * Creates the sequelize and mysql connection
 * @property sequelizeConnection
 * @type Object
 */
var sequelizeConnection = new sequelize('XXXXXXXXXXXX', 'XXX', 'XXX', {
    host: 'XXXXX',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    logging: false,
    pool: {
        max: 15,
        min: 0,
        idle: 10000
    }
});


/**
 * Instance of sequelize database connection
 *
 * @method sequelizeConn
 * @return {Object} sequelize connection instance
 */
exports.sequelizeConn = function connectSequelize() {
    return sequelizeConnection;
};

/**
 * Referencing the sequelize connection
 * @property sequelizeConnect
 * @type {Object}
 */
var sequelizeConnect = this.sequelizeConn();

/**
 * Sync the sequelize connection with
 * different options
 *
 * @method sync
 * @param {Object} anonymous
 */
sequelizeConnect.sync(
    {
        force: false
    }
);