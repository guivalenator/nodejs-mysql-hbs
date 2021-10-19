const mysql= require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TOO MANY CONNECTIONS')
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTIONS WAS REFUSED')
        }
    }
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

//Promisify Pool Querys
pool.query = promisify(pool.query);
module.exports = pool;
