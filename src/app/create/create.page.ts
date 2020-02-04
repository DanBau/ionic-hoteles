import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HoteldbService } from '../core/hoteldb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IHotel } from '../share/interfaces';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  hotel: IHotel;
  hotelForm: FormGroup;

  constructor(private router: Router,
    private hoteldbService: HoteldbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.hotelForm = new FormGroup({
      nombre: new FormControl(''),
      ciudad: new FormControl(''),
      image: new FormControl(''),
      capacidad: new FormControl(''),
      estrellas: new FormControl(''),
      precio: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Hotel',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveHotel();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveHotel() {
    this.hotel = this.hotelForm.value;
    let nextKey = this.hotel.nombre.trim();
    this.hotel.id = nextKey;
    this.hoteldbService.setItem(nextKey, this.hotel);
    console.warn(this.hotelForm.value);
  }
}


