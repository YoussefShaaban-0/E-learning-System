import { Injectable } from '@angular/core';
import { Assignment } from '../interfaces/assignment';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, collectionData, doc, getDocs, query, where } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Course } from '../interfaces/course';
// import { fromDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private firestore: Firestore) { }

  addAssignment(assignment: Assignment): void {
      const assignmentsCollection = collection(this.firestore, 'assignments');
      addDoc(assignmentsCollection, { ...assignment })
          .then(() => {
              console.log('Assignment added successfully!');
          })
          .catch((error) => {
              console.error('Error adding assignment: ', error);
          });
  }

  getAssignment(): Observable<Assignment[]> {
    const assignmentCollection = collection(this.firestore, 'assignments');
    const assignment = collectionData(assignmentCollection, { idField: 'id' });
    return assignment as Observable<Assignment[]>;
  }



  // getCourseName(courseId: string): Observable<string> {
  //   const courseDocument = doc(this.firestore, 'courses', courseId);
  //   return fromDoc(courseDocument).pipe(
  //     map(doc => {
  //       return doc.data().name;
  //     })
  //   );
  // }

  async getCoursename(id: string): Promise<string> {
    const q = query(
        collection(this.firestore, 'courses'),
        where('__name__', '==', id)
    );
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const courseName = userData['title'];
        return courseName;
    } else {
        return ''; // Return an empty string if course with the provided ID is not found
    }
}


  // getAssignmentsByCourseId(courseId: string): Observable<Assignment[]> {
  //   return this.firestore.collection('assignments', (ref: { 
  //     where: (arg0: string, arg1: string, arg2: string) => any; }) => ref.where('courseId', '==', courseId)).valueChanges();
  // }
}
