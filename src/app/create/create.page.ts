import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HotelcrudService } from '../core/hotelcrud.service';
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
  hotelNombre: string;
  hotelCiudad: string;
  hotelImage:string;
  hotelCapacidad:number;
  hotelEstrellas:number;
  hotelPrecio:number;

  constructor(private router: Router,
    private hotelcrud: HotelcrudService,
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
    let record = {};
    record['id'] = this.hotel.id;
    record['nombre'] = this.hotel.nombre;
    record['ciudad'] = this.hotel.ciudad;
    record['capacidad'] = this.hotel.capacidad;
    record['image'] = this.hotel.image;
    record['precio'] = this.hotel.precio;
    record['estrellas'] = this.hotel.estrellas;
    this.hotelcrud.create_Hotel(record).then(resp => {
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
}


