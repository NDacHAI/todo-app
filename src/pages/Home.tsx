import { useUser } from "@context/useUser";
import HomeNoLogin from "@pages/HomeNoLogin";
import LoadingCheckUserOverLay from "@component/LoadingCheckUserOverLay";
import TodoList from "@component/TodoList";

const Home = () => {
    const { user, loading } = useUser();

    if (loading) {
        return <LoadingCheckUserOverLay />;
    }

    return user ? (
        <div className="min-h-screen flex flex-col justify-center items-center  bg-gradient-to-br from-blue-100 to-blue-200 dark:from-neutral-900 dark:to-neutral-900 mt-[1px] ">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
                    Xin chào, {user.name || "bạn"} 👋
                </h1>
                <p className="text-gray-500 text-sm">
                    {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}
                </p>
            </div>

            <TodoList />
        </div>

    ) : (
        <HomeNoLogin />
    );
};

export default Home;
