//==============================
//Obtener People de API SWAPI
//==============================

let options = {

    host: 'swapi.py4e.com',
    path: '/api/people/',
    headers: {},
};

module.exports.get = (event, context, callback) => {

    var https = require('https');

    const req = https.request(options, (res) => {
        let body = '';
        res.setEncoding('utf-8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {

            console.log('Responses HTTPS procesado exitosamente');
            body = JSON.parse(body);

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(body),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    isBase64Encoded: false
                },
            });
        });

    });
    req.on('error', callback);
    req.end();
}