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
    return this.firestore.collection('Hotels').add(record);
  }
  read_Hotels() {
    return this.firestore.collection('Hotels').snapshotChanges();
  }
  update_Hotel(recordID, record) {
    this.firestore.doc('Hotels/' + recordID).update(record);
  }
  delete_Hotel(record_id) {
    this.firestore.doc('Hotels/' + record_id).delete();
  }
}