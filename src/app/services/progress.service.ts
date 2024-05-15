import { Injectable } from '@angular/core';
import { Firestore, QuerySnapshot, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Progress } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private firestore: Firestore) { }


  addProgress(progress: Progress): void {
    const progressCollection = collection(this.firestore, 'progress');
    addDoc(progressCollection, { ...progress})
        .then(() => {
            console.log('Progress added successfully!');
        })
        .catch((error) => {
            console.error('Error adding Progress: ', error);
        });
}
 async getProgressUICI(userId: any, courseId: any): Promise<Progress> {
  const q = query(
    collection(this.firestore, 'progress'),
    where('userId', '==', userId),
    where('courseId', '==', courseId),
  );
  const querySnapshot: QuerySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const progress: Progress = {
        id: querySnapshot.docs[0].id,
        courseId: userData['courseId'],
        userId: userData['userId'],
        completedLectures: userData['completedLectures'] || [],
        completedMaterials: userData['completedMaterials'],
        // Add other properties as needed
      };
      return progress;
    } else {
      const progress: Progress = {
        id: '',
        userId: 'userID',
        courseId: 'CourseID',
        completedLectures: [],
        completedMaterials: 0,
      };
      return progress;
    }
}
}
