import { Injectable } from '@angular/core';
import { Firestore, docData, updateDoc } from '@angular/fire/firestore';
import { Collections } from '@enum/collections.enum';
import { UserDetails } from '@model/user-details.model';
import { doc, setDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ContactFormData } from '@model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore, private afs: AngularFirestore) {}

  addData(collection: string, data: any): Observable<void> {
    const ref = doc(this.firestore, collection, data.uid);
    return from(setDoc(ref, data));
  }

  getData(collection: string, uid: string) {
    const ref = doc(this.firestore, collection, uid);
    return docData(ref);
  }

  getAllData(collection: string) {
    return this.afs.collection(collection).valueChanges();
  }

  updateUser(user: UserDetails): Observable<void> {
    const ref = doc(this.firestore, Collections.USERS, user.uid ?? '');
    return from(updateDoc(ref, { ...user }));
  }

  updateOrder(order: ContactFormData): Observable<void> {
    const ref = doc(this.firestore, Collections.ORDERS, order.uid ?? '');
    return from(updateDoc(ref, { ...order }));
  }
}
