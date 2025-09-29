import { useUser } from "@context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { logout } from "firebase/api/auth";
import { toast } from "react-toastify";

const Header = () => {

    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        setUser(null)
        toast.success("Đăng xuất thành công")
        navigate('login')
    }


    return (
        <div className="max-w-full bg-white dark:bg-neutral-900 dark:text-white shadow dark:shadow-white/20">
            <div className="w-7xl mx-auto flex justify-between items-center h-18">
                <Link to="/" className="font-bold text-2xl">Todo App</Link>
                {user
                    ?
                    (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-blue-600 font-bold text-white py-1 px-4 rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer">

                                <FontAwesomeIcon icon={faPlus} />
                                <span>Thêm mới</span>
                            </div>
                            <button className="border py-1 px-4 rounded hover:scale-110 transition-all duration-300 cursor-pointer"
                                onClick={() => handleLogout()}
                            >Đăng xuất</button>
                        </div>
                    )

                    : (
                        <div className="flex items-center gap-4">
                            <Link to="/login"
                                className="bg-blue-600 font-bold border dark:border-blue-600 text-white py-1 px-4 rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                            >
                                Đăng nhập
                            </Link>
                            <Link to="/register"
                                className="border py-1 px-4 rounded hover:px-5 hover:py-1.5 transition-all duration-300"
                            >
                                Đăng kí
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Header;