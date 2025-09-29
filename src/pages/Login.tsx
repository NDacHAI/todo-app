import SpinnerOverlay from "@component/SpinnerOverlay";
import { useUser } from "@context/UserContext";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from "firebase/api/auth";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const state = location.state as { Email?: string, password?: string } | undefined;

    const [isShowPassword, setIsShowPassWord] = useState(false)

    const [Email, setEmail] = useState(state?.Email ?? "");
    const [password, setPassword] = useState(state?.password ?? "");
    const [loading, setLoading] = useState(false)

    const { setUser } = useUser()

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userProfile = await login(Email, password); // gọi hàm từ auth.ts
            setUser({
                id: userProfile.uid,
                name: userProfile.name,
            });
            toast.success("Đăng nhập thành công");
            navigate("/");

        } catch (err) {
            toast.error("Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full h-screen flex items-center justify-center dark:bg-neutral-900">
            <div className="max-w-sm w-full mx-auto bg-white dark:bg-neutral-800 dark:text-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
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
                        <span>Bạn chưa có tài khoản</span>
                        <Link className="text-blue-600 underline text-md" to="/register"> Đăng kí ngay</Link>
                    </div>
                    <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() => handleLogin()}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
            {loading && <SpinnerOverlay />}
        </div>
    );
};

export default Login;
