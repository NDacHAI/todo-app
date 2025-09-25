import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {

    const [isShowPassword, setIsShowPassWord] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="w-full h-screen flex items-center justify-center dark:bg-neutral-900">
            <div className="max-w-sm w-full mx-auto bg-white dark:bg-neutral-800 dark:text-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Đăng kí</h2>
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            id="username"
                            type="email"
                            className="peer w-full p-2 rounded border dark:border-gray-700 dark:bg-neutral-900"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label
                            htmlFor="username"
                            className={`absolute left-2 transition-all
                                    ${username !== ""
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
                    <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-600 cursor-pointer">
                        Đăng kí
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
