import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';
import { Firestore, QuerySnapshot, addDoc, arrayUnion, collection, collectionData, doc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { Assignment } from '../interfaces/assignment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  lec: string[] = ["lecture1"]

  constructor(private firestore: Firestore) { }

  getCourses(): Observable<Course[]> {
    const coursesCollection = collection(this.firestore, 'courses');
    const courses = collectionData(coursesCollection, { idField: 'id' });
    return courses as Observable<Course[]>;
  }

  addCourse(title: any, description: any, img: any){
    const coursesCollection = collection(this.firestore, 'courses');
    addDoc(coursesCollection, {title, description, img})
  }

  updateCourse(id: string, updatedCourse: Course) {
    const coursesCollection = collection(this.firestore, 'courses');
    const course = doc(coursesCollection, id);
    setDoc(course, updatedCourse);
  }

  async getCourse(id: string): Promise<Course> {
    const q = query(
      collection(this.firestore, 'courses'),
      where('__name__', '==', id)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const course: Course = {
        id: querySnapshot.docs[0].id,
        title: userData['title'],
        description: userData['description'],
        img: userData['img'],
        lectures: userData['lectures'],
       // Add other properties as needed
      };
      return course;
    } else {
      const course: Course = {
        id: '',
        title: 'username',
        description: 'email',
        img: 'role',
        lectures: this.lec,
      };
      return course;
    }
  }

  addLecture(courseId: string, newLecture: string) {
    const coursesCollection = collection(this.firestore, 'courses');
    const course = doc(coursesCollection, courseId);
    updateDoc(course, {
      lectures: arrayUnion(newLecture)
    });
  }

  // addAssignment(assignment: Assignment): Promise<any> {
  //   const assignmentsCollection = collection(this.firestore, 'assignments');
  //   return assignmentsCollection.add(assignment);
  // }


  // addAssignment(courseId: string, newLecture: string) {
  //   const coursesCollection = collection(this.firestore, 'courses');
  //   const course = doc(coursesCollection, courseId);
  //   updateDoc(course, {
  //     assignment: arrayUnion(newLecture)
  //   });
  // }
}
