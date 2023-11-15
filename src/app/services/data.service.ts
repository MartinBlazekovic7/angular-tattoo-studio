import { Injectable } from '@angular/core';
import { Firestore, docData, updateDoc } from '@angular/fire/firestore';
import { Collections } from '@enum/collections.enum';
import { UserDetails } from '@model/user-details.model';
import { doc, setDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  addData(collection: string, data: any): Observable<void> {
    const ref = doc(this.firestore, collection, data.uid);
    return from(setDoc(ref, data));
  }

  getData(collection: string, uid: string) {
    const ref = doc(this.firestore, collection, uid);
    return docData(ref);
  }

  updateUser(user: UserDetails): Observable<void> {
    const ref = doc(this.firestore, Collections.USERS, user.uid ?? '');
    return from(updateDoc(ref, { ...user }));
  }
}
