export interface User {
    id: string
    username: string;
    email: string;
    password: string;
    waiting: boolean;
    role: string;
    courses: string[];
    requestedCourses: string[];
    // courseProgress: { [courseId: string]: number };
}

export interface Progress {
    id: string;
    courseId: string;
    userId: string;
    completedMaterials: number;
    completedLectures: number[];
}