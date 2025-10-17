import type React from "react";
import type { DataTodo } from "@myTypes/todoType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateTodo } from "../firebase/db";
import { deleteTodo } from "../firebase/db";
import { toast } from "react-toastify";

type Data = { data: DataTodo, onAdded?: () => void, onLoadingStart?: () => void, onLoadingEnd?: () => void, onEdit?: (data: DataTodo) => void };

const TodoItem: React.FC<Data> = ({ data, onAdded, onLoadingEnd, onLoadingStart, onEdit }) => {

    const handleToggle = async () => {
        try {
            onLoadingStart?.()
            await updateTodo(data.id, { completed: !data.completed });
            onAdded?.()
        } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
        } finally {
            onLoadingEnd?.()
        }
    };

    const handleDelete = async (id: string) => {
        try {
            onLoadingStart?.();
            await deleteTodo(id);
            toast.success("Xóa công việc thành công!");
            onAdded?.();
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi xóa công việc!");
        } finally {
            onLoadingEnd?.();
        }
    };

    const isOverDay = !data.completed && data.dueDay?.toDate() < new Date();




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
                    checked={data.completed}
                    onChange={handleToggle}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <div>
                    <h1 className="font-bold text-lg leading-none">{data.title}</h1>
                    <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 italic">
                            <span>Create: </span>
                            {data.createdAt?.toDate().toLocaleDateString("vi-VN")}
                        </span>
                        <span className="text-xs text-gray-500 italic ml-2">
                            Due day:
                            <span> {data.dueDay?.toDate().toLocaleDateString("vi-VN")}</span>
                        </span>

                    </div>

                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 text-neutral-800 text-sm mr-1">
                {data.completed ? (
                    <div
                        className="inline-block px-3 py-1.5 rounded-full text-white font-semibold shadow-sm text-sm bg-green-500/90"
                    >
                        Success
                    </div>
                ) : isOverDay ? (
                    <div
                        className="inline-block px-3 py-1.5 rounded-full text-white font-semibold shadow-sm text-sm bg-red-500/90"
                    >
                        OverDay
                    </div>
                ) : null}

                <FontAwesomeIcon
                    title="Delete"
                    className="hover:text-white bg-gray-300 hover:bg-red-500 cursor-pointer p-2 rounded-full transition-all duration-300"
                    icon={faTrash}
                    onClick={() => handleDelete(data.id)}
                />
                {!data.completed && (
                    <FontAwesomeIcon
                        title="Edit"
                        className="hover:text-white bg-gray-300 hover:bg-blue-500 cursor-pointer p-2 rounded-full transition-all duration-300"
                        icon={faPen}
                        onClick={() => onEdit?.(data)}
                    />
                )}
            </div>
        </div>
    );
};

export default TodoItem;
