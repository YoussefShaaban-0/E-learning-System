import { Injectable } from '@angular/core';
import { Assignment } from '../interfaces/assignment';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, collectionData, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
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

  getAssignments(): Observable<Assignment[]> {
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

async getAssignmentsCount(): Promise<number> {
  const q = collection(this.firestore, 'assignments');
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
  try {
    return querySnapshot.size; // Return the number of documents in the query result
  } catch (error) {
    console.error('Error fetching document count:', error);
    return 0; // Return 0 if there's an error or no documents found
  }
}

// async getAssignment(id: string): Promise<Assignment> {
//   const q = query(
//     collection(this.firestore, 'assignments'),
//     where('__name__', '==', id)
//   );
//   const querySnapshot: QuerySnapshot = await getDocs(q);

//   if (!querySnapshot.empty) {
//     const userData = querySnapshot.docs[0].data();
//     const user: Assignment = {
//       id: querySnapshot.docs[0].id,
//       choices: userData['choices'],
//       // correctChoices: userData['correctChoices'],
//       courseId: userData['password'],
//       deadline: userData['waiting'],
//       role: userData['role'],
      
      
//       // Add other properties as needed
//     };
//     return user;
//   } else {
//     const user: User = {
//       id: '',
//       username: 'username',
//       email: 'email',
//       role: 'role',
//       waiting: true,
//       password: 'password',
//     };
//     return user;
//   }
// }

async getAssignmentsByCourseId(courseId: string): Promise<Assignment[]> {
  const q = query(
    collection(this.firestore, 'assignments'),
    where('courseId', '==', courseId)
  );

  const querySnapshot: QuerySnapshot = await getDocs(q);

  const assignments: Assignment[] = [];

  querySnapshot.forEach((doc) => {
    const assignmentData = doc.data();
    const assignment: Assignment = {
      id: doc.id,
      choices: assignmentData['choices'] || [],
      courseId: assignmentData['courseId'],
      deadline: assignmentData['deadline'],
      question: assignmentData['question'] || [],
      score: assignmentData['score'] || [],
      title: assignmentData['title'],
      // Add other properties as needed
    };

    assignments.push(assignment); // Push each assignment to the array
  });

  return assignments; // Return the array of assignments
}

async getAssignment(id: string): Promise<Assignment> {
  const q = query(
    collection(this.firestore, 'assignments'),
    where('__name__', '==', id)
  );
  const querySnapshot: QuerySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const assignmentData = querySnapshot.docs[0].data();
    const assignment: Assignment = {
      id: querySnapshot.docs[0].id,
      choices: assignmentData['choices'] || [], // Handle choices as an array (default to empty array if not found)
      //correctChoices: assignmentData['correctChoices'] || [], // Handle correctChoices as an array (default to empty array if not found)
      courseId: assignmentData['courseId'],
      deadline: assignmentData['deadline'],
      question: assignmentData['question'] || [],
      score: assignmentData['score'],
      title: assignmentData['title'],
      // Add other properties as needed
    };
    return assignment;
  } else {
    const assignment: Assignment = {
      id: '',
      choices: ['choices'], // Handle choices as an array (default to empty array if not found)
      //correctChoices: assignmentData['correctChoices'] || [], // Handle correctChoices as an array (default to empty array if not found)
      courseId: 'this.courseId',
      deadline: 'deadline',
      question: ['question'],
      score: 0,
      title:'title'
      // Add other properties as needed
    };
    return assignment;
  }
}

addScore(assignmentId: string, score: number) {
  const assignmentCollection = collection(this.firestore, 'شssignments');
  const assignment = doc(assignmentCollection, assignmentId);
  updateDoc(assignment, { score: score });
}

// the length of 

}
