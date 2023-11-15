import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { AuthInterface } from '../interfaces/auth-interface.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authInterface?: AuthInterface;

  constructor(private auth: Auth) {
    this.authInterface = auth as AuthInterface;
  }

  currentUser$ = authState(this.authInterface!);

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  /* getCurrentUser(): Observable<any> {
    return this.currentUser$;
  } */

  sendPasswordResetEmail(email: string): Observable<any> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  /* confirmPasswordReset(code: string, newPassword: string): Observable<any> {
    return from(confirmPasswordReset(this.auth, code, newPassword));
  } */

  signInWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }
}
