import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const HomeNoLogin = () => {

    return (
        <div className="h-screen flex justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-neutral-900 dark:to-neutral-900 mt-[1px]">
            <div className="mt-12 text-center">
                <h1 className="text-3xl text-white font-bold [text-shadow:_0_0_12px_rgba(59,130,246,0.9),_0_0_24px_rgba(59,130,246,0.6)]">TODO LIST </h1>
                <div className="flex justify-between mt-6 relative">
                    <Link to="/login" className="py-1 px-4 bg-blue-600 rounded-lg text-white dark:border-none shadow-lg cursor-pointer transition-all duration-300 animate-bounce">Add Task</Link>
                    <Link to="/login" className="flex items-center gap-3 py-1 px-4 w-24 dark:bg-blue-200 dark:text-neutral-800 bg-sky-100 text-neutral-900 font-bold rounded cursor-pointer relative shadow-lg"
                    >
                        <span className="hover:animate-bounce">ALL</span>
                        <FontAwesomeIcon icon={faAngleDown} className="animate-bounce" />
                    </Link>

                </div>
                <div className="w-xl bg-sky-100 border border-blue-200 dark:bg-neutral-800 mt-4 rounded-lg shadow-lg p-4">
                    <span>Thêm công việc mới</span>
                </div>
            </div>
        </div>
    );
}

export default HomeNoLogin;