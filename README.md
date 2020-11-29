<!--
title: 'API en Node.js con el framework Serverless'
description: 'TAPI en Node.js con el framework Serverless para un despliegue en AWS.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS

-->
## Serverless REST API

Se configuró un Api Gateway  + Lambda + DynamoDB o SWAPI
Carpeta rimac: API para DynamoDb
Carpeta swapi: API para SWAPI

Ruta SWAPI: https://swapi.py4e.com/ 

Son configurados en el archivo `serverless.yml`.

## Setup

Para instalar en serverless correr:

Step #1 
npm install serverless -g
Step #2 
serverless install -u https://github.com/pmallaupoma/retorimac.git -n aws-node-rimac-reto




## Deploy

Para desplegar el endpoint correr:

serverless deploy

## Resultado

El resultado esperado es similar a:

endpoints:

  POST - https://bn71qzqogk.execute-api.us-east-1.amazonaws.com/dev/rimac
  GET - https://bn71qzqogk.execute-api.us-east-1.amazonaws.com/dev/rimac/{id}
  GET - https://bn71qzqogk.execute-api.us-east-1.amazonaws.com/dev/swapi/people
  GET - https://bn71qzqogk.execute-api.us-east-1.amazonaws.com/dev/swapi/planets 

functions:

  create: aws-node-rest-api-with-dynamodb-rimac-3-dev-create
  get: aws-node-rest-api-with-dynamodb-rimac-3-dev-get
  listpeople: aws-node-rest-api-with-dynamodb-rimac-3-dev-listpeople
  listplanets: aws-node-rest-api-with-dynamodb-rimac-3-dev-listplanets


### Uso

Se puede consultar(Get) y crear(Post) items sobre la bd dynamodb.
Se puede consultar(Get) el APi SWAPI.

### Get Rimac

Para obtener datos de la poliza se consulta en la bd DynamoDB por el id de la poliza 

Tipo: GET
https://bn71qzqogk.execute-api.us-east-1.amazonaws.com/dev/rimac/{id}

donde id: id de cada item poliza, tiene el siguiente aspecto (b2e681cb-9071-4f2c-bcb1-65b1b5279378)

### Post Rimac

Para crear datos de la poliza en la bd DynamoDB.
Tipo: POST

https://bn71qzqogk.execute-api.us-east-1.amazonaws.com/dev/rimac

Request Ejemplo: 

{
  poliza: "P45000",
  tipopoliza: "Vida Vul",
  sumaasegurada: "28600",
  prima: "85",
  coberturas: "Muerte Natural"
}


### Get People SWAPI

Para obtener datos de personas de la API SWAPI.
Tipo: GET

https://bn71qzqogk.execute-api.us-east-1.amazonaws.com/dev/swapi/people


### Get Planets SWAPI

Para obtener datos de planetas de la API SWAPI.
Tipo: GET

https://bn71qzqogk.execute-api.us-east-1.amazonaws.com/dev/swapi/planets



