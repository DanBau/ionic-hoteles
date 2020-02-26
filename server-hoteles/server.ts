var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Hotel {
  constructor(
    public id:number,
    public nombre:string,
    public ciudad:string,
    public image:string,
    public capacidad:number,
    public estrellas:number,
    public precio:number,
  ) { }
}

const hotels: Hotel[] = [
  new Hotel(
    1,
    "Hotel 1",
    "Pamplona",
    "../../assets/img/hotel1.jpg",
    10000,
    5,
    100
  ),
  new Hotel(
    2,
    "Hotel 2",
    "Valencia",
    "../../assets/img/hotel2.jpg",
    20000,
    2,
    200
  ),
  new Hotel(
    3,
    "Hotel 3",
    "Pais Vasco",
    "../../assets/img/hotel3.jpg",
    30000,
    3,
    300
  ),
  new Hotel(
    4,
    "Hotel 4",
    "Sevilla",
    "../../assets/img/hotel2.jpg",
    40000,
    4,
    400
  )
]





function getHotels(): any[] {
  return hotels;
}

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/hotels', bodyParser.json(), (req: any, res: any) => {

  let pNew = new Hotel(
    hotels.length + 1,
    req.body.nombre,
    req.body.ciudad,
    req.body.image,
    req.body.capacidad,
    req.body.estrellas,
    req.body.precio
  );
  hotels.push(pNew);
  res.status(200).send({ 
    id: pNew.id,
    nombre: pNew.nombre,
    ciudad: pNew.ciudad,
    image: pNew.image,
    capacidad: pNew.capacidad,
    estrellas: pNew.estrellas,
    precio: pNew.precio,
   });
 
})

app.get('/', (req: any, res: any) => {
  res.send('The URL of hotels is http://localhost:8000/hotels');
});

app.get('/hotels', (req: any, res: any) => {
  res.json(getHotels());
});


function getHotelsById(hotelId: number): any {
  let p: any;
  p = hotels.find(p => p.id == hotelId);
  return p;
}

app.get('/hotels/:id', (req: any, res: any) => {
  res.json(getHotelsById(parseInt(req.params.id)));
});



function updateHotelsById(req:any, hotelId: number): any {
  let p: any;
  p = hotels.find(p => p.id == hotelId);
  let index = hotels.indexOf(p);

  p.nombre =  req.body.nombre,
  p.ciudad =  req.body.ciudad,
  p.image =  req.body.image,
  p.capacidad =  req.body.capacidad,
  p.estrellas =  req.body.estrellas,
  p.precio =  req.body.precio
  
  hotels[index] = p;
  return p;
}

app.put('/hotels/:id', function (req:any, res:any) {
  res.json(updateHotelsById(req, parseInt(req.params.id)));
  res.send('Got a UPDATE request at /user');
});


function deleteHotelsById(hotelId: number): any {
  let p: any;
  p = hotels.find(p => p.id == hotelId);
  let index = hotels.indexOf(p);
  hotels.splice(index,1);
  return p;
}

app.delete('/hotels/:id', function (req:any, res:any) {
  res.json(deleteHotelsById(parseInt(req.params.id)));
  res.send('Got a DELETE request at /user');
});



const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});





