// src/firebase/db.ts
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

// Lấy tất cả todos
export const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Thêm 1 todo mới

export const addTodo = async (todo: { title: string; completed: boolean; dueDay: Date }) => {
    const docRef = await addDoc(collection(db, "todos"), {
        ...todo,
        createdAt: serverTimestamp(), // ✅ thời gian tạo từ server
    });
    return docRef.id;
};
export const getTodoById = async (id: string) => {
    const docRef = doc(db, "todos", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Cập nhật todo
export const updateTodo = async (
    id: string,
    data: Partial<{ title: string; completed: boolean; dueDay: Date }>
) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, data);
};


// Xóa todo
export const deleteTodo = async (id: string) => {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
};

export { db };
