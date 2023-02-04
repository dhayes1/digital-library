const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const swaggerDoc = require('./swagger-output.json');
const database = require('./db/connection');

const port = process.env.PORT || 8080;
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(cors({origin: '*'}));

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        next();
    });

app.use('/', require('./routes'));

database.initDb((err, monogodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});