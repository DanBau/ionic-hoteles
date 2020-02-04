import { Component, OnInit } from '@angular/core';
import { IHotel } from '../share/interfaces';
import { HoteldbService } from '../core/hoteldb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public hoteles: IHotel[];
  hotelesinit: IHotel[] = [
    {
      id: '1',
      nombre: "Hotel1",
      ciudad: "Pamplona",
      image: "../../assets/img/hotel1.jpg",
      capacidad: 1000,
      estrellas: 1,
      precio: 50
    },
    {
      id: '2',
      nombre: "Hotel2",
      ciudad: "Valencia",
      image: "../../assets/img/hotel2.jpg",
      capacidad: 2000,
      estrellas: 2,
      precio: 100
    },
    {
      id: '3',
      nombre: "Hotel3",
      ciudad: "Barcelona",
      image: "../../assets/img/hotel3.jpg",
      capacidad: 2000,
      estrellas: 2,
      precio: 100
    }
  ];

  constructor(private hoteldbService: HoteldbService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.hoteles !== undefined) {
      this.hoteles.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.hoteldbService.empty()) {
      this.hotelesinit.forEach(hotel => {
        this.hoteldbService.setItem(hotel.id, hotel);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.hoteldbService.getAll().then(
      (data) => this.hoteles = data
    );
  }
  async hotelTapped(hotel) {
   this.route.navigate(['details', hotel.id]);
  }
}


