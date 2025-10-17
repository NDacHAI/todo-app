// src/firebase/db.ts
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, serverTimestamp, query, where } from "firebase/firestore";
import { app, auth } from "./config"; // auth từ Firebase

const db = getFirestore(app);

// Lấy todos của người dùng hiện tại
export const fetchTodos = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return [];

    const q = query(collection(db, "todos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Thêm 1 todo mới
export const addTodo = async (todo: { title: string; completed: boolean; dueDay: Date }) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("Người dùng chưa đăng nhập");

    const docRef = await addDoc(collection(db, "todos"), {
        ...todo,
        userId,
        createdAt: serverTimestamp(), // thời gian tạo từ server
    });
    return docRef.id;
};

// Lấy todo theo id
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
