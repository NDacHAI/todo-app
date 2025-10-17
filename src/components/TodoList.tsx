import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import type { DataTodo } from "@myTypes/todoType";
import TodoForm from "./TodoForm";
import { fetchTodos } from "../firebase/db";
import SpinnerOverlay from "./SpinnerOverlay";



const TodoList = () => {
    const [openOption, setOpenOption] = useState(false);
    const [valueOption, setValueOption] = useState("ALL");
    const [openTodoForm, setOpenTodoForm] = useState(false);
    const [todoList, setTodoList] = useState<DataTodo[]>([]);
    const [loading, setLoading] = useState(false)
    const [editingTodo, setEditingTodo] = useState<DataTodo | null>(null);


    const options = ["ALL", "NEW"];
    const handleCloseForm = () => setOpenTodoForm(false);

    const loadTodos = async () => {
        const data = await fetchTodos();
        setTodoList(data as DataTodo[]);
    };
    useEffect(() => {
        loadTodos();
    }, []);

    const handleAdded = () => {
        loadTodos()
    }

    const handleEdit = (todo: DataTodo) => {
        setEditingTodo(todo);
        setOpenTodoForm(true)
    };

    const handleLoadingStart = () => setLoading(true);
    const handleLoadingEnd = () => setLoading(false);

    return (
        <div className="mt-12 text-center">
            <h1 className="text-3xl text-white font-bold [text-shadow:_0_0_12px_rgba(59,130,246,0.9),_0_0_24px_rgba(59,130,246,0.6)]">
                TODO LIST
            </h1>

            <div className="flex justify-between mt-6 relative">
                <button
                    className="py-1 px-4 bg-blue-600 rounded-lg text-white shadow-lg cursor-pointer transition-all duration-300 animate-bounce"
                    onClick={() => setOpenTodoForm(true)}
                >
                    Add Task
                </button>

                <div
                    className="flex items-center gap-3 py-1 px-4 w-24 bg-sky-100 text-neutral-900 font-bold rounded cursor-pointer relative shadow-lg"
                    onClick={() => setOpenOption(!openOption)}
                >
                    <span className="select-none">{valueOption}</span>
                    <FontAwesomeIcon icon={faAngleDown} className="animate-bounce" />
                </div>

                {openOption && (
                    <ul className="absolute right-0 -bottom-18 z-50 fadeDown select-none">
                        {options.map((opt) => (
                            <li
                                key={opt}
                                onClick={() => {
                                    setValueOption(opt);
                                    setOpenOption(false);
                                }}
                                className="w-18 py-1 px-2 bg-sky-100 text-neutral-900 font-bold rounded cursor-pointer text-center mt-1 hover:text-blue-600 transition-all duration-300 shadow-lg"
                            >
                                {opt}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="w-xl bg-sky-100 border border-blue-200 mt-4 rounded-lg shadow-lg p-4">
                {todoList.length > 0 ? (
                    todoList.map((item) => <TodoItem key={item.id} data={item} onAdded={handleAdded} onEdit={handleEdit}
                        onLoadingEnd={handleLoadingEnd}
                        onLoadingStart={handleLoadingStart}
                    />)
                ) : (
                    <p className="text-gray-500 italic">Chưa có công việc nào</p>
                )}
            </div>

            {openTodoForm && <TodoForm onClose={handleCloseForm} onAdded={handleAdded} todoToEdit={editingTodo} />}
            {loading && <SpinnerOverlay />}
        </div>
    );
};

export default TodoList;
