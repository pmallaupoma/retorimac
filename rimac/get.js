//==============================
//Obtener Polizas de DynamoDb
//==============================

'use strict';

const AWS = require('aws-sdk'); // obtener acceso a AWS SDK

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };

    // obtener el listado de datos del dynamoDb
    dynamoDb.get(params, (error, result) => {
        // manejar potenciales errores
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'No se pudo traer los datos, revisar errores con la base de datos',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
        callback(null, response);
    });
};