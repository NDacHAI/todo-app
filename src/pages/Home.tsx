import { toast } from "react-toastify";

const Home = () => {

    const testToast = () => {
        toast.success("click")
    }

    return (
        <div className="h-screen">home
            <button onClick={() => testToast()}>click</button>
        </div>
    );
}

export default Home;