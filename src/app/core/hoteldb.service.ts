import { Injectable } from '@angular/core';
import { IHotel } from '../share/interfaces';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class HoteldbService {
  auxHotel: IHotel;
  auxHotelList: IHotel[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: IHotel) {
    this.storage.set(reference, {
      id: value.id,
      nombre: value.nombre,
      ciudad:value.ciudad,
      image: value.image,
      capacidad: value.capacidad,
      estrellas:value.estrellas,
      precio:value.precio
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<IHotel> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<IHotel[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: IHotel) => this.auxHotelList.push(data)
        );
      });
      return this.auxHotelList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  // Removes all stored values.
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
}
