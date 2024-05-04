import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Auth, getAuth, provideAuth} from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

const firebaseConfig = {
  apiKey: "AIzaSyB-GteoNm5XQnXoRai9QwfVmF4N0F9RO4Q",
  authDomain: "edulearn-a1a18.firebaseapp.com",
  projectId: "edulearn-a1a18",
  storageBucket: "edulearn-a1a18.appspot.com",
  messagingSenderId: "526075705663",
  appId: "1:526075705663:web:ef3763c04c70493e1f7b8a"
};


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth())
    )
  ]
};
