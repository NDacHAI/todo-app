import type { Timestamp } from "firebase/firestore";


export type DataTodo = {
    id: string; // Firestore document ID
    title: string;
    completed: boolean;
    dueDay: Timestamp;
    createdAt: Timestamp;
};
