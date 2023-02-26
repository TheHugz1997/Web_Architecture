//Import express
let express = require('express');

//Import router
let router = express.Router();

//Create the session
let session = require('express-session');

let flight = require('./controllers/flightcontroller.js');

router.get('/', flight.reservationPage);
router.post('/reservation', flight.reservationSession);
router.get('/encodage', flight.encodagePage);
router.post('/names', flight.namesSession);
router.get('/validation', flight.validationPage);
router.get('/database', flight.databasePage);

router.get('/clear-session', flight.redirection);

module.exports = router;