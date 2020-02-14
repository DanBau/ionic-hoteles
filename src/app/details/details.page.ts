import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelcrudService } from '../core/hotelcrud.service';
import { IHotel } from '../share/interfaces';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

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

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private hoteldbService: HotelcrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.retrieveValues();
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
          this.hotel.id = e.payload.doc.id;
            this.hotel.nombre = e.payload.doc.data()['nombre'];
            this.hotel.capacidad = e.payload.doc.data()['capacidad'];
            this.hotel.ciudad = e.payload.doc.data()['ciudad'];
            this.hotel.image = e.payload.doc.data()['image'];
            this.hotel.precio = e.payload.doc.data()['precio'];
            this.hotel.estrellas = e.payload.doc.data()['estrellas'];
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

  editRecord(hotel) {
    this.router.navigate(['edit', hotel.id])
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
