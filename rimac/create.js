//==============================
//Crear una Poliza en DynamoDb
//==============================

'use strict';



const AWS = require('aws-sdk'); // obtener acceso a AWS SDK

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();


    const contextid = context.awsRequestId; // obtener un requestId

    const data = event;

    if (typeof data.poliza !== 'string') {

        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'No se pudo crear el item, revisar el request.',
        });
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: contextid,
            poliza: data.poliza,
            tipopoliza: data.tipopoliza,
            sumaasegurada: data.sumaasegurada,
            prima: data.prima,
            coberturas: data.cobertura,
            checked: false,
            fechacreacion: timestamp,
            fechaactualizacion: timestamp,
        },
    };

    // escribir en la base de datos dynamoDB
    dynamoDb.put(params, (error) => {
        // manejar potenciales errores
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'No se pudo crear el item, revisar errores con la base de datos',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};