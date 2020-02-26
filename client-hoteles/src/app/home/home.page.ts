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
  haveValues: boolean = false;

  constructor(private hoteldbService: HoteldbService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.ionViewDidEnter();
    this.retrieveValues();
  }

  ionViewDidEnter(){
    if(this.hoteles !== undefined){
      this.hoteles.splice(0);
    }
    this.retrieveValues();
  }

  retrieveValues(){
    this.hoteldbService.getHotels().subscribe(
      (data: IHotel[]) => {
        this.haveValues = false;
        this.hoteles = data;
        this.haveValues = true;
      });
  }

  async hotelTapped(hotel) {
    this.route.navigate(['details', hotel.id]);
  }
}


