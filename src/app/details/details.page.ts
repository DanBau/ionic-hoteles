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

  id: number;
  public hotel: IHotel;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private hoteldbService: HoteldbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = parseInt(this.activatedroute.snapshot.params['id']);
    this.hoteldbService.getHotelById(this.id).subscribe(
      (data: IHotel) => this.hotel = data
    );
  }

  editRecord(hotel) {
    this.router.navigate(['edit', hotel.id])
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.router.navigate(['']);
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
            this.hoteldbService.deleteHotel(id).subscribe(
              () => this.onSaveComplete(),
            );
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
