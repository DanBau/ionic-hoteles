import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HoteldbService } from '../core/hoteldb.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  errorMessage: string;
  id:number;

  constructor(private router: Router,
    private hoteldbService: HoteldbService,
    private activatedroute: ActivatedRoute,
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
    this.id = parseInt(this.activatedroute.snapshot.params['productId']);
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
    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        this.hotel = this.hotelForm.value;
        this.hotel.id = this.id;
        
        this.hoteldbService.createHotel(this.hotel)
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
}


