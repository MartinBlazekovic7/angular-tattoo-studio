import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from '@component/footer/footer.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent, NavigationBarComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FooterComponent,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'storyline-tattoo-studio',
        appId: '1:885706440836:web:7f379a662da4e32d8ac2d1',
        storageBucket: 'storyline-tattoo-studio.appspot.com',
        apiKey: 'AIzaSyBKmxgcgQWaxElqVWdA5GuBtebSubpDCTY',
        authDomain: 'storyline-tattoo-studio.firebaseapp.com',
        messagingSenderId: '885706440836',
        measurementId: 'G-E6JLP5NXZE',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
