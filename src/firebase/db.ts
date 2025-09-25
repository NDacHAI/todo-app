// src/firebase/db.ts
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

// Lấy tất cả todos
export const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Thêm 1 todo mới
export const addTodo = async (todo: { title: string; completed: boolean }) => {
    const docRef = await addDoc(collection(db, "todos"), todo);
    return docRef.id;
};

export { db };
