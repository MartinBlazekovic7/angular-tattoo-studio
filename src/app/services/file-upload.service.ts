import { Injectable } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { ContactFormData } from '@model/contact.model';
import { finalize, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storage: Storage, private firestore: Firestore) {}

  uploadFile(file: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, file));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
