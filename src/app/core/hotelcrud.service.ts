import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class HotelcrudService {

  hotels: any;
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Hotel(record) {
    return this.firestore.collection('hoteles').add(record);
  }
  read_Hotels() {
    return this.firestore.collection('hoteles').snapshotChanges();
  }
  update_Hotel(recordID, record) {
    this.firestore.doc('hoteles/' + recordID).update(record);
  }
  delete_Hotel(record_id) {
    this.firestore.doc('hoteles/' + record_id).delete();
  }
}