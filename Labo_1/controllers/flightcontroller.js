let Reservation = require("../models/reservation");
let Passenger = require("../models/passenger");

const priceBySeat = 45;
const priceForAssurance = 20;

const mysql = require("mysql");

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'ecamair'
});

//Get the reservation
exports.reservationPage = function(req, res) {
    res.render('reservation.ejs');
};

exports.redirection = function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}

exports.reservationSession = function(req, res) {
    var destination = req.body.destination;
    var seats = req.body.seats;
    if("assurance" in req.body) {
        var assurance = true;
        var totalprice = (seats*priceBySeat) + priceForAssurance;
    } else {
        var assurance = false;
        var totalprice = (seats*priceBySeat);
    }
    console.log(totalprice);
    let reservation = new Reservation(destination, seats, assurance, totalprice);
    req.session.reservation = reservation;
    console.log(req.session);
    res.redirect('/encodage')
};

exports.encodagePage = function(req, res) {
    res.render('encodage.ejs', {seatsnumb: parseInt(req.session.reservation.seats)});
};

exports.namesSession = function(req, res) {
    req.session.passengers = [];
    if(req.session.reservation.seats > 1){
        for(let i = 0; i < req.body.name.length; i++){
            let passenger = new Passenger(req.body.name[i], req.body.age[i]);
            req.session.passengers.push(passenger);
        }
    } else {
        let passenger = new Passenger(req.body.name, req.body.age);
        req.session.passengers.push(passenger);
    }
    console.log(req.session);
    res.redirect('/validation');
};

exports.validationPage = function(req, res) {
    let listOfNames = [];
    let listOfAges = [];
    for(let i = 0; i < req.session.passengers.length; i++){
        listOfNames.push(req.session.passengers[i].firstname);
        listOfAges.push(req.session.passengers[i].age);
    }
    res.render('validation.ejs', {
        destination : req.session.reservation.destination, 
        names : listOfNames, 
        age : listOfAges
    });
};


exports.databasePage = function(req, res) {
    // Pushing the reservation into the database ecamair in the reservation table

    connection.query(
        `INSERT INTO ecamair.reservation(destination, seats, assurance, pricetotal) VALUES (?,?,?,?)`,
        [   req.session.reservation.destination,
            req.session.reservation.seats,
            req.session.reservation.assurance,
            req.session.reservation.totalprice
        ], function(err, result) {
        if (err) throw err;
      
        // Insert a row into the passengers table with the reservationID set to the id of the reservation row that was just inserted
        for(let i = 0; i < req.session.passengers.length; i++){
            connection.query(`INSERT INTO ecamair.passengers(firstname, age, destination, reservationID) VALUES (?,?,?,?)`,
            [req.session.passengers[i].firstname, req.session.passengers[i].age, req.session.reservation.destination, result.insertId]);
        }
      });
    res.render('databasePage.ejs');
};