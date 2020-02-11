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

  constructor(private hoteldbService: HoteldbService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.hoteldbService.getHotels().subscribe(
      (data: IHotel[]) => this.hoteles = data);
  }

  async hotelTapped(hotel) {
   this.route.navigate(['details', hotel.id]);
  }
}


