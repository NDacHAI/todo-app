import type React from "react";
import type { DataTodo } from "@myTypes/todoType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

type Data = { data: DataTodo };

const TodoItem: React.FC<Data> = ({ data }) => {
    return (
        <div
            className="
        flex items-center justify-between 
        bg-gray-100
        dark:bg-blue-100
        text-neutral-900
        mb-2 shadow-sm hover:shadow-md 
        rounded-lg p-3 transition-all duration-300
        hover:-translate-y-1
        text-left
      "
        >
            {/* Left side */}
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={data.isChecked}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <div>
                    <h1 className="font-bold text-lg leading-none">{data.title}</h1>
                    <span className="text-xs text-gray-500 italic">{data.timeCreate}</span>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 text-neutral-800 text-sm mr-1">
                {data.status && (
                    <div
                        className={`
              inline-block px-3 py-1.5 rounded-full text-white font-semibold shadow-sm text-sm 
              animate-fade-in
              ${data.status === "Success"
                                ? "bg-green-500/90"
                                : "bg-red-500/90"
                            }
            `}
                    >
                        {data.status}
                    </div>
                )}

                <FontAwesomeIcon
                    title="Delete"
                    className="hover:text-white bg-gray-300 hover:bg-red-500 cursor-pointer p-2 rounded-full transition-all duration-300"
                    icon={faTrash}
                />
                {data.status !== "Success" ? (<FontAwesomeIcon
                    title="Edit"
                    className="hover:text-white bg-gray-300 hover:bg-blue-500 cursor-pointer p-2 rounded-full transition-all duration-300"
                    icon={faPen}
                />) : (<></>)}
            </div>
        </div>
    );
};

export default TodoItem;
