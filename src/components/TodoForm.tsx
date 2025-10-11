import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import TodoItem from "./TodoItem";
import type { DataTodo } from "@myTypes/todoType"

const TodoForm = () => {

    const [openOption, setOpenOption] = useState(false)
    const [valueOption, setValueOption] = useState("ALL")
    const options = ["ALL", "NEW"]

    const todoList: DataTodo[] = [
        { id: 1, title: "lam viec", timeCreate: "123r3", isChecked: true, status: "Success" },
        { id: 2, title: "lam viec", timeCreate: "123r3", isChecked: false, status: "Overdue" },
        { id: 3, title: "lam viec", timeCreate: "123r3", isChecked: false, status: "" },
        { id: 4, title: "lam viec", timeCreate: "123r3", isChecked: false, status: "" },
    ]

    return (
        <div className="mt-12 text-center">
            <h1 className="text-3xl text-white font-bold [text-shadow:_0_0_12px_rgba(59,130,246,0.9),_0_0_24px_rgba(59,130,246,0.6)]">TODO LIST </h1>
            <div className="flex justify-between mt-6 relative">
                <button className="py-1 px-4 bg-blue-600 rounded-lg text-white dark:border-none shadow-lg cursor-pointer hover:-translate-y-1 transition-all duration-300">Add Task</button>
                <div className="flex items-center gap-3 py-1 px-4 w-24 dark:bg-blue-200 dark:text-neutral-800 bg-sky-100 text-neutral-900 font-bold rounded cursor-pointer relative shadow-lg"
                    onClick={() => setOpenOption(!openOption)}
                >
                    <span>{valueOption}</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
                {openOption && (
                    <ul className="absolute right-0 -bottom-18 z-50">
                        {options.map(opt => (
                            <li key={opt}
                                onClick={() => {
                                    setValueOption(opt)
                                    setOpenOption(false)
                                }}
                                className="w-18 py-1 px-2 dark:bg-blue-200 dark:text-neutral-800 bg-sky-100 text-neutral-900 font-bold rounded cursor-pointer
                                        left-0 -bottom-9 text-center mt-1 hover:text-blue-600 transition-all duration-300 shadow-lg
                                    "
                            >
                                {opt}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="w-xl bg-sky-100 border border-blue-200 dark:bg-neutral-800 mt-4 rounded-lg shadow-lg p-4">
                {
                    todoList.map(item => (
                        <TodoItem key={item.id} data={item} />
                    ))
                }
            </div>
        </div>
    );
}

export default TodoForm;