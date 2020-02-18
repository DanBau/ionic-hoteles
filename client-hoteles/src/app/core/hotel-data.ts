import { InMemoryDbService } from 'angular-in-memory-web-api';

export class HotelData implements InMemoryDbService {

  createDb() {
    let hotels = [
      {
        id: 1,
        nombre: "Hotel1",
        ciudad: "Pamplona",
        image: "../../assets/img/hotel1.jpg",
        capacidad: 1000,
        estrellas: 1,
        precio: 50
      },
      {
        id: 2,
        nombre: "Hotel2",
        ciudad: "Valencia",
        image: "../../assets/img/hotel2.jpg",
        capacidad: 2000,
        estrellas: 2,
        precio: 100
      },
      {
        id: 3,
        nombre: "Hotel3",
        ciudad: "Barcelona",
        image: "../../assets/img/hotel3.jpg",
        capacidad: 2000,
        estrellas: 2,
        precio: 100
      }
    ];
    return { hotels: hotels };
  }
}
