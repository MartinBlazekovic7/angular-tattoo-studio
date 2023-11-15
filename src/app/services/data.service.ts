import { Injectable } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
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
}
