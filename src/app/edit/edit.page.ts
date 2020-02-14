import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HotelcrudService } from '../core/hotelcrud.service';
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
  public hotels: IHotel[];
  hotel: IHotel = {
    id: undefined,
    nombre: undefined,
    ciudad: undefined,
    capacidad: undefined,
    estrellas: undefined,
    precio: undefined,
    image: undefined
  }
  hotelForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private hoteldbService: HotelcrudService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.retrieveValues();
    this.hotelForm = new FormGroup({
      nombre: new FormControl(''),
      ciudad: new FormControl(''),
      image: new FormControl(''),
      capacidad: new FormControl(''),
      estrellas: new FormControl(''),
      precio: new FormControl(''),
    });

  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    this.retrieveValues();
  }

  retrieveValues() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.hoteldbService.read_Hotels().subscribe(data => {
      this.hotels = data.map(e => {
        if (this.id == e.payload.doc.id) {
          this.id = e.payload.doc.id;
          this.hotel.id = e.payload.doc.id;
          this.hotel.nombre = e.payload.doc.data()['nombre'];
          this.hotel.capacidad = e.payload.doc.data()['capacidad'];
          this.hotel.ciudad = e.payload.doc.data()['ciudad'];
          this.hotel.image = e.payload.doc.data()['image'];
          this.hotel.precio = e.payload.doc.data()['precio'];
          this.hotel.estrellas = e.payload.doc.data()['estrellas'];
          this.displayProduct(this.hotel);
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
        }

      })
      console.log(this.hotel);
    });
  }

  displayProduct(hotel: IHotel): void {
    if (this.hotelForm) {
      this.hotelForm.reset();
    }

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
    this.hotel = this.hotelForm.value;
    let record = {};
    record['nombre'] = this.hotel.nombre;
    record['capacidad'] = this.hotel.capacidad;
    record['ciudad'] = this.hotel.ciudad;
    record['image'] = this.hotel.image;
    record['precio'] = this.hotel.precio;
    record['estrellas'] = this.hotel.estrellas;
    this.hoteldbService.update_Hotel(this.id, this.hotel);
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
            this.hoteldbService.delete_Hotel(id);
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
