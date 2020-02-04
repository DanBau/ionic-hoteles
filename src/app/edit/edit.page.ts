import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HoteldbService } from '../core/hoteldb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IHotel } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  public hotel: IHotel;
  hotelForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private hoteldbService: HoteldbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.hoteldbService.getItem(this.id).then(
      (data: IHotel) => {
        this.hotel = data;
        this.displayProduct(this.hotel);
      });
    this.hotelForm = new FormGroup({
      nombre: new FormControl(''),
      ciudad: new FormControl(''),
      image: new FormControl(''),
      capacidad: new FormControl(''),
      estrellas: new FormControl(''),
      precio: new FormControl(''),
    });
  
  }

  displayProduct(hotel: IHotel): void {
    if (this.hotelForm) {
      this.hotelForm.reset();
    }
    this.hotel = hotel;

    // Update the data on the form
    this.hotelForm.patchValue({
      nombre: this.hotel.nombre,
      ciudad: this.hotel.ciudad,
      image: this.hotel.image,
      capacidad: this.hotel.capacidad,
      estrellas: this.hotel.estrellas,
      precio: this.hotel.precio
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Editar Hotel',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'create',
          text: 'ACEPTAR',
          handler: () => {
            this.editHotel();
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


  editHotel() {
    this.hoteldbService.remove(this.hotel.id);
    this.hotel = this.hotelForm.value;
    let nextKey = this.hotel.nombre.trim();
    this.hotel.id = nextKey;
    this.hoteldbService.setItem(nextKey, this.hotel);
    console.warn(this.hotelForm.value);
    this.hoteldbService.remove(this.hotel.id);
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar hotel',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.hoteldbService.remove(id);
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
}
