import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { register } from "firebase/api/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import SpinnerOverlay from "@component/SpinnerOverlay";

const Register = () => {

    const [isShowPassword, setIsShowPassWord] = useState(false)

    const [Email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async () => {
        setLoading(true)
        try {
            await register(Email, password)
            toast.success("Đăng kí thành công")
            setEmail("")
            setPassword("")
            navigate("/login", { state: { Email, password } });
        } catch (err) {
            const error = err as FirebaseError;
            if (error.code === "auth/email-already-in-use") {
                toast.error("Email đã được sử dụng");
            } else if (error.code === "auth/invalid-email") {
                toast.error("Email không hợp lệ");
            } else if (error.code === "auth/weak-password") {
                toast.error("Mật khẩu quá yếu (tối thiểu 6 ký tự)");
            } else {
                toast.error("Đăng ký thất bại");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-neutral-900 dark:to-neutral-900">
            <div className="max-w-sm w-full mx-auto bg-white dark:bg-neutral-800 dark:text-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Đăng kí</h2>
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            id="Email"
                            type="email"
                            className="peer w-full p-2 rounded border dark:border-gray-700 dark:bg-neutral-900"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            htmlFor="Email"
                            className={`absolute left-2 transition-all
                                    ${Email !== ""
                                    ? "-top-2.5 text-sm bg-white text-neutral-800 dark:bg-neutral-900 dark:text-white"
                                    : "top-2 text-gray-400"}
                                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-neutral-800 
                                        dark:peer-focus:text-white peer-focus:bg-white dark:peer-focus:bg-neutral-900`}
                        >
                            Tên tài khoản
                        </label>

                    </div>


                    <div className="relative">
                        <input
                            id="password"
                            type={isShowPassword ? "text" : "password"}
                            className="peer w-full p-2 rounded border dark:border-gray-700 dark:bg-neutral-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="password"
                            className={`absolute left-2 transition-all
                                        ${password !== ""
                                    ? "-top-2.5 text-sm bg-white text-neutral-800 dark:bg-neutral-900 dark:text-white"
                                    : "top-2 text-gray-400"}
                                            peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-neutral-800 
                                            dark:peer-focus:text-white peer-focus:bg-white dark:peer-focus:bg-neutral-900`}
                        >
                            Mật khẩu
                        </label>

                        <FontAwesomeIcon
                            icon={isShowPassword ? faEyeSlash : faEye}
                            onClick={() => setIsShowPassWord(!isShowPassword)}
                            className="absolute right-2 top-3 cursor-pointer"
                        />


                    </div>

                    <div className="text-sm">
                        <span>Bạn đã có tài khoản</span>
                        <Link className="text-blue-600 underline text-md" to="/login"> Đăng nhập ngay</Link>
                    </div>
                    <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-800 cursor-pointer transition-all duration-300"
                        onClick={() => handleRegister()}
                    >
                        Đăng kí
                    </button>
                </div>
            </div>
            {loading && <SpinnerOverlay />}
        </div>
    );
};

export default Register;
