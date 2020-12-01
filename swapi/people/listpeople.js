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

            //AGREGADO PARA TRANSLATE
            body = JSON.parse(body);
            // Funcion para Renombrar Key de JSON
            function renameKey() {

                body = JSON.parse(JSON.stringify(body).split('"count":').join(process.env.Contar));
                body = JSON.parse(JSON.stringify(body).split('"next":').join(process.env.Siguiente));
                body = JSON.parse(JSON.stringify(body).split('"previous":').join(process.env.Anterior));
                body = JSON.parse(JSON.stringify(body).split('"results":').join(process.env.Resultados));
                body = JSON.parse(JSON.stringify(body).split('"name":').join(process.env.Nombre));
                body = JSON.parse(JSON.stringify(body).split('"height":').join(process.env.Altura));
                body = JSON.parse(JSON.stringify(body).split('"mass":').join(process.env.Masa));
                body = JSON.parse(JSON.stringify(body).split('"hair_color":').join(process.env.Color_Pelo));
                body = JSON.parse(JSON.stringify(body).split('"skin_color":').join(process.env.Color_Piel));
                body = JSON.parse(JSON.stringify(body).split('"eye_color":').join(process.env.Color_Ojos));
                body = JSON.parse(JSON.stringify(body).split('"birth_year":').join(process.env.Ano_Nacimiento));
                body = JSON.parse(JSON.stringify(body).split('"gender":').join(process.env.Genero));
                body = JSON.parse(JSON.stringify(body).split('"homeworld":').join(process.env.Mundo_Natal));
                body = JSON.parse(JSON.stringify(body).split('"films":').join(process.env.Peliculas));
                body = JSON.parse(JSON.stringify(body).split('"species":').join(process.env.Especies));
                body = JSON.parse(JSON.stringify(body).split('"vehicles":').join(process.env.Vehiculos));
                body = JSON.parse(JSON.stringify(body).split('"starships":').join(process.env.Naves_Estelares));
                body = JSON.parse(JSON.stringify(body).split('"created":').join(process.env.Creado));
                body = JSON.parse(JSON.stringify(body).split('"edited":').join(process.env.Editado));

            }
            renameKey();


            /////////
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