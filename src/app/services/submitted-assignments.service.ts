import { Injectable } from '@angular/core';
import { Assignment } from '../interfaces/assignment';
import { Firestore, QuerySnapshot, addDoc, arrayUnion, collection, collectionData, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SubmittedAssignments } from '../interfaces/submitted-assignments';

@Injectable({
  providedIn: 'root'
})
export class SubmittedAssignmentsService {

  constructor(private firestore: Firestore) { }

  addAssignment(assignment: SubmittedAssignments): void {
    const assignmentsCollection = collection(this.firestore, 'submittedAssignments');
    addDoc(assignmentsCollection, { ...assignment })
        .then(() => {
            console.log('Assignment added successfully!');
        })
        .catch((error) => {
            console.error('Error adding assignment: ', error);
        });
}

getAssignments(): Observable<SubmittedAssignments[]> {
  const assignmentCollection = collection(this.firestore, 'submittedAssignments');
  const assignment = collectionData(assignmentCollection, { idField: 'id' });
  return assignment as Observable<SubmittedAssignments[]>;
}

async getAssignmentsByUserId(userId: string): Promise<SubmittedAssignments[]> {
  const q = query(
    collection(this.firestore, 'submittedAssignments'),
    where('userId', '==', userId)
  );

  const querySnapshot: QuerySnapshot = await getDocs(q);

  const assignments: SubmittedAssignments[] = [];

  querySnapshot.forEach((doc) => {
    const assignmentData = doc.data();
    const assignment: SubmittedAssignments = {
      id: doc.id,
      choices: assignmentData['choices'] || [],
      courseId: assignmentData['courseId'],
      userId: assignmentData['userId'],
      question: assignmentData['question'] || [],
      score: assignmentData['score'],
      title: assignmentData['title'],
      deadline: assignmentData['deadline']
      // Add other properties as needed
    };

    assignments.push(assignment); // Push each assignment to the array
  });

  return assignments; // Return the array of assignments
}

addScore(assignmentId: string, score: number) {
  const assignmentCollection = collection(this.firestore, 'submittedAssignments');
  const assignment = doc(assignmentCollection, assignmentId);
  updateDoc(assignment, { score: score });
}

async getAssignment(id: string): Promise<Assignment> {
  const q = query(
    collection(this.firestore, 'submittedAssignments'),
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

}
