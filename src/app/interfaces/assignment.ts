export interface Assignment {
    id: string;
    courseId: string;
    // coursename: string;
    title: string;
    deadline: string;
    question: string[];
    choices: string[];
    // correctChoice: boolean[];
    score: number[];
    // points: number 
}
