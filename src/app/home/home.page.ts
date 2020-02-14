import { Component, OnInit } from '@angular/core';
import { IHotel } from '../share/interfaces';
import { HotelcrudService } from '../core/hotelcrud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public hotels: IHotel[];

  constructor(private hoteldbService: HotelcrudService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.retrieveValues();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    this.retrieveValues();
  }
  retrieveValues() {
    this.hoteldbService.read_Hotels().subscribe(data => {
      this.hotels = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['nombre'],
          capacidad: e.payload.doc.data()['capacidad'],
          ciudad: e.payload.doc.data()['ciudad'],
          image: e.payload.doc.data()['image'],
          precio: e.payload.doc.data()['precio'],
          estrellas: e.payload.doc.data()['estrellas'],
        };
      })
      console.log(this.hotels);
    });

  }
  async hotelTapped(hotel) {
    this.route.navigate(['details', hotel.id]);
  }
}


