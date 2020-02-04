import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HoteldbService } from '../core/hoteldb.service';
import { IHotel } from '../share/interfaces';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  public hotel: IHotel;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private hoteldbService: HoteldbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.hoteldbService.getItem(this.id).then(
      (data: IHotel) => this.hotel = data);
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
