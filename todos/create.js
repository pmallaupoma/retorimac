'use strict';

//const { "v4": uuidv4 } = require('uuid'); //const uuid = require('uuid');
//const { v4: uuid } = require('uuid');

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    console.log('MIRA AQUI' + event.headers);
    console.log('Function name: ', context.awsRequestId);
    const contextid = context.awsRequestId;
    //console.log('CONTEXT ' + AWS.context.awsRequestId);
    //const data = JSON.parse(event);
    const data = event;
    console.error('MIRA AQUI 1.5' + data);
    console.error('MIRA AQUI 2' + event);
    if (typeof data.poliza !== 'string') {
        console.error('Validation Failed');
        console.error('MIRA AQUI 3' + event);
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the todo item 1.',
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
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    // write the todo to the database
    dynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t create the todo item 5.',
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