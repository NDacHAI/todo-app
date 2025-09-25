import { useUser } from "@context/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

    let { user, setUser } = useUser()

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
                                <span>Add todo</span>
                            </div>
                            <button className="border py-1 px-4 rounded hover:scale-110 transition-all duration-300 cursor-pointer">Logout</button>
                        </div>
                    )

                    : (
                        <div className="flex items-center gap-4">
                            <Link to="/login"
                                className="bg-blue-600 font-bold border dark:border-blue-600 text-white py-1 px-4 rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                            >
                                Login
                            </Link>
                            <Link to="/register"
                                className="border py-1 px-4 rounded hover:px-5 hover:py-1.5 transition-all duration-300"
                            >
                                Register
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Header;