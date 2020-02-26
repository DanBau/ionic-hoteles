var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Hotel = /** @class */ (function () {
    function Hotel(id, nombre, ciudad, image, capacidad, estrellas, precio) {
        this.id = id;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.image = image;
        this.capacidad = capacidad;
        this.estrellas = estrellas;
        this.precio = precio;
    }
    return Hotel;
}());
var hotels = [
    new Hotel(1, "Hotel 1", "Pamplona", "../../assets/img/hotel1.jpg", 10000, 5, 100),
    new Hotel(2, "Hotel 2", "Valencia", "../../assets/img/hotel2.jpg", 20000, 2, 200),
    new Hotel(3, "Hotel 3", "Pais Vasco", "../../assets/img/hotel3.jpg", 30000, 3, 300),
    new Hotel(4, "Hotel 4", "Sevilla", "../../assets/img/hotel2.jpg", 40000, 4, 400)
];
function getHotels() {
    return hotels;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/hotels', bodyParser.json(), function (req, res) {
    var pNew = new Hotel(hotels.length + 1, req.body.nombre, req.body.ciudad, req.body.image, req.body.capacidad, req.body.estrellas, req.body.precio);
    hotels.push(pNew);
    res.status(200).send({
        id: pNew.id,
        nombre: pNew.nombre,
        ciudad: pNew.ciudad,
        image: pNew.image,
        capacidad: pNew.capacidad,
        estrellas: pNew.estrellas,
        precio: pNew.precio
    });
});
app.get('/', function (req, res) {
    res.send('The URL of hotels is http://localhost:8000/hotels');
});
app.get('/hotels', function (req, res) {
    res.json(getHotels());
});
function getHotelsById(hotelId) {
    var p;
    p = hotels.find(function (p) { return p.id == hotelId; });
    return p;
}
app.get('/hotels/:id', function (req, res) {
    res.json(getHotelsById(parseInt(req.params.id)));
});
function updateHotelsById(req, hotelId) {
    var p;
    p = hotels.find(function (p) { return p.id == hotelId; });
    var index = hotels.indexOf(p);
    p.nombre = req.body.nombre,
        p.ciudad = req.body.ciudad,
        p.image = req.body.image,
        p.capacidad = req.body.capacidad,
        p.estrellas = req.body.estrellas,
        p.precio = req.body.precio;
    hotels[index] = p;
    return p;
}
app.put('/hotels/:id', function (req, res) {
    res.json(updateHotelsById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteHotelsById(hotelId) {
    var p;
    p = hotels.find(function (p) { return p.id == hotelId; });
    var index = hotels.indexOf(p);
    hotels.splice(index, 1);
    return p;
}
app["delete"]('/hotels/:id', function (req, res) {
    res.json(deleteHotelsById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
