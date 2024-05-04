import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import {
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  firebaseAuth = inject(Auth);
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    const users = collectionData(usersCollection, { idField: 'id' });
    return users as Observable<User[]>;
  }

  addUser(username: any, email: any, password: any) {
    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, {
      username,
      email,
      password,
      role: 'student',
      waiting: true,
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', email),
      where('password', '==', password),
      where('waiting', '==', false)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  }

  deleteUser(id: string) {
    const usersCollection = collection(this.firestore, 'users');
    const user = doc(usersCollection, id);
    deleteDoc(user);
  }

  updateUser(id: string, updatedUser: User) {
    const usersCollection = collection(this.firestore, 'users');
    const user = doc(usersCollection, id);
    setDoc(user, updatedUser);
    // setDoc(usersCollection, user)
  }

  async getUser(id: string): Promise<User> {
    const q = query(
      collection(this.firestore, 'users'),
      where('__name__', '==', id)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const user: User = {
        id: querySnapshot.docs[0].id,
        username: userData['username'],
        email: userData['email'],
        password: userData['password'],
        waiting: userData['waiting'],
        role: userData['role'],
        
        
        // Add other properties as needed
      };
      return user;
    } else {
      const user: User = {
        id: '',
        username: 'username',
        email: 'email',
        role: 'role',
        waiting: true,
        password: 'password',
      };
      return user;
    }
  }
  async getUserByEmail(email: string): Promise<User> {
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', email)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const user: User = {
        id: querySnapshot.docs[0].id,
        username: userData['username'],
        email: userData['email'],
        password: userData['password'],
        waiting: userData['waiting'],
        role: userData['role'],
        
        
        // Add other properties as needed
      };
      return user;
    } else {
      const user: User = {
        id: '',
        username: 'username',
        email: 'email',
        role: 'role',
        waiting: true,
        password: 'password',
      };
      return user;
    }
  }
}
