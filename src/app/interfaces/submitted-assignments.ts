export interface SubmittedAssignments {
    id: string;
    courseId: string;
    userId: string;
    title: string;
    deadline: string;
    question: string[];
    choices: string[];
    score: number;
    // points: number 
}
