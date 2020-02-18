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

  id: number;
  public hotel: IHotel;
  hotelForm: FormGroup;
  errorMessage: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
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
    this.id = parseInt(this.activatedroute.snapshot.params['id']);
    this.getHotel(this.id);

  }

  getHotel(id: number): void {
    this.hoteldbService.getHotelById(id)
      .subscribe(
        (hotel: IHotel) => this.displayHotel(hotel),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayHotel(hotel: IHotel): void {
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
    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        this.hotel = this.hotelForm.value;
        this.hotel.id = this.id;

        this.hoteldbService.updateHotel(this.hotel)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );


      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.hotelForm.reset();
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
              (error: any) => this.errorMessage = <any>error
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
