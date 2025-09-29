import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config"
import { doc, setDoc, getDoc } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
}


export const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Lưu thêm vào Firestore (nếu chưa có)
    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.email,
        createdAt: new Date(),
        role: "user",
    });

    return user;
};

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const uid = userCredential.user.uid;

    // Lấy thêm dữ liệu user từ Firestore
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);


    if (!docSnap.exists()) throw new Error("User profile not found in Firestore");
    const data = docSnap.data();

    return { uid, ...data } as UserProfile
}

export const logout = async () => {
    return await signOut(auth)
}